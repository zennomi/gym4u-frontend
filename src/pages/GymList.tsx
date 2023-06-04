import { Box, Button, Card, CardContent, CardHeader, Container, Grid, InputAdornment, OutlinedInput, Rating, Stack, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Page from "../components/Page";
import Map from "../sections/gymlist/Map";
import { GetGymListRequestOptions } from "../types";
import { defaultGetGymListOptions, facilitiesOptions } from "../constants";
import Iconify from "../components/Iconify";
import { FormProvider, RHFMultiCheckbox } from "../components/hook-form";
import { useState } from "react";
import { useGyms } from "../hooks/useGym";
import Image from "../components/Image";
import { randomNumberRange } from "../_mock/funcs";
import { fCurrency, fShortenNumber } from "../utils/formatNumber";

export default function GymList() {

    const [options, setOptions] = useState<GetGymListRequestOptions | null>(null)
    const { data, isLoading, error } = useGyms(options)

    const methods = useForm<GetGymListRequestOptions>({
        defaultValues: defaultGetGymListOptions
    });

    const { register, handleSubmit, watch, formState: { errors }, setValue } = methods

    const values = watch()

    const onSubmit: SubmitHandler<GetGymListRequestOptions> = data => setOptions(data);

    return (
        <Page title="Gym List">
            <Container sx={(theme) => ({
                paddingTop: theme.spacing(10),
                [theme.breakpoints.up('md')]: {
                    paddingTop: theme.spacing(15),
                },
            })}>
                <Grid container>
                    <Grid item xs={4}>
                        <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
                            <Stack width={"100%"} px={2} spacing={2}>
                                <Button fullWidth variant="contained" type="submit" size="large">
                                    模索
                                </Button>
                                <OutlinedInput
                                    id="standard-adornment-amount"
                                    startAdornment={<InputAdornment position="start"><Iconify icon="eva:search-fill" /></InputAdornment>}
                                    fullWidth

                                    autoComplete=""
                                    placeholder="ジムの名前"
                                    {...register("name")}
                                />
                                <Card>
                                    <CardHeader title="オプション" />
                                    <CardContent>
                                        <RHFMultiCheckbox
                                            name="facilities"
                                            options={facilitiesOptions.map(f => ({ label: f, value: f }))}
                                        />
                                    </CardContent>
                                </Card>
                                <Typography>距離: <Typography component="span" color="primary.main" sx={{ fontWeight: 700 }}>{fShortenNumber(values.radius || 0)}m</Typography></Typography>
                                <Map
                                    setCenter={(c) => { setValue('lat', c.lat); setValue('lng', c.lng) }}
                                    setRadius={(r) => setValue('radius', r)}
                                />
                            </Stack>
                        </FormProvider>
                    </Grid>
                    <Grid item xs={8}>
                        <Box px={2}>
                            <Stack spacing={2}>
                                {
                                    isLoading ? <div>Loading...</div> :
                                        error ? <div>Error</div> :
                                            data?.results.map(gym =>
                                            (
                                                <Card>
                                                    <CardContent>
                                                        <Grid container>
                                                            <Grid xs={4}>
                                                                <Image src={gym.image} ratio="4/3" sx={{ borderRadius: 2, width: "100%" }} />
                                                            </Grid>
                                                            <Grid px={2} xs={8}>
                                                                <Typography variant="h4" color="primary.main">{gym.name}</Typography>
                                                                <Box display="flex" justifyContent="space-between">
                                                                    <Rating value={randomNumberRange(0, 5)} />
                                                                    <Typography variant="h6">{fCurrency(gym.price)}/1ヶ月</Typography>
                                                                </Box>
                                                                <Typography>
                                                                    {gym.description}
                                                                </Typography>
                                                                <Box display="flex" justifyContent="space-between" justifyItems="end">
                                                                    <Typography sx={{ mr: 1 }}><Iconify icon="carbon:location-filled" /> {gym.address}</Typography>
                                                                    <Button sx={{ whiteSpace: "nowrap", mt: 'auto', display: 'flex', minWidth: 'unset' }} variant="contained" endIcon={<Iconify icon="eva:eye-fill" />}>
                                                                        詳細
                                                                    </Button>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Card>
                                            )
                                            )
                                }
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}