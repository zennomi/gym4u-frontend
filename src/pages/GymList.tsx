import { Box, Button, Card, CardContent, CardHeader, Container, Grid, InputAdornment, OutlinedInput, Pagination, Rating, Stack, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link as RouterLink, useSearchParams } from "react-router-dom";

import Page from "../components/Page";
import Map from "../sections/gymlist/Map";
import { GetGymListRequestOptions, Location } from "../types";
import { defaultGetGymListOptions, facilitiesOptions } from "../constants";
import Iconify from "../components/Iconify";
import { FormProvider, RHFMultiCheckbox } from "../components/hook-form";
import { useEffect, useState } from "react";
import { useGyms } from "../hooks/useGym";
import Image from "../components/Image";
import { randomNumberRange } from "../_mock/funcs";
import { fCurrency, fShortenNumber } from "../utils/formatNumber";
import { defaultLocation } from "../constants";
import { PATH_PAGE } from "../routes/paths";

export default function GymList() {


    const [options, setOptions] = useState<Required<GetGymListRequestOptions> | null>(null)
    const [searchParams, setSearchParams] = useSearchParams();
    const [lat, lng] = [searchParams.get('lat'), searchParams.get('lng')]
    const location: Location = {
        lat: lat ? parseFloat(lat) : defaultLocation.lat,
        lng: lng ? parseFloat(lng) : defaultLocation.lng,
    }
    const [myLocation, setMylocation] = useState<Location | null>(null);

    const { data, isLoading, error } = useGyms(options)

    const methods = useForm<Required<GetGymListRequestOptions>>({
        defaultValues: { ...defaultGetGymListOptions, ...location }
    });

    const { register, handleSubmit, watch, formState: { errors }, setValue } = methods

    const values = watch()

    const onSubmit: SubmitHandler<Required<GetGymListRequestOptions>> = data => setOptions(data);

    const getLocation = () => {
        if (!navigator.geolocation) {
            console.log('Geolocation is not supported by your browser');
        } else {
            console.log('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setMylocation({ lat: position.coords.latitude, lng: position.coords.longitude })
            }, () => {
                console.error('Unable to retrieve your location');
            });
        }
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setOptions(values)
        return () => setOptions(null)
    }, [values.page])

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
                                            name="facilityTags"
                                            options={facilitiesOptions}
                                        />
                                    </CardContent>
                                </Card>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography>距離: <Typography component="span" color="primary.main" sx={{ fontWeight: 700 }}>{fShortenNumber(values.distance || 0)}m</Typography></Typography>
                                    <Button variant="outlined" onClick={getLocation}>あなたの場所</Button>
                                </Stack>
                                <Map
                                    setCenter={(c) => { setValue('lat', c.lat); setValue('lng', c.lng) }}
                                    setRadius={(r) => setValue('distance', r)}
                                    location={{ lat: values.lat, lng: values.lng }}
                                    myLocation={myLocation}
                                />
                            </Stack>
                        </FormProvider>
                    </Grid>
                    <Grid item xs={8}>
                        <Box px={2} mb={2}>
                            <Stack spacing={2}>
                                {
                                    isLoading ? <div>Loading...</div> :
                                        error ? <div>Error</div> :
                                            data && data.results.length > 0 ?
                                                data.results.map(gym =>
                                                (
                                                    <Card>
                                                        <CardContent>
                                                            <Grid container>
                                                                <Grid xs={4}>
                                                                    <Image src={gym.images[0]} ratio="4/3" sx={{ borderRadius: 2, width: "100%" }} />
                                                                </Grid>
                                                                <Grid px={2} xs={8}>
                                                                    <Typography variant="h4" color="primary.main">{gym.name}</Typography>
                                                                    <Box display="flex" justifyContent="space-between">
                                                                        <Rating value={gym.averageRating} precision={0.1} readOnly />
                                                                        <Typography variant="h6">{fCurrency(gym.price)}/1ヶ月</Typography>
                                                                    </Box>
                                                                    <Typography>
                                                                        {gym.description}
                                                                    </Typography>
                                                                    <Box display="flex" justifyContent="space-between" justifyItems="end">
                                                                        <Typography sx={{ mr: 1 }}><Iconify icon="carbon:location-filled" /> {gym.address}</Typography>
                                                                        <Button
                                                                            component={RouterLink}
                                                                            to={PATH_PAGE.gymDetails(gym._id)}
                                                                            sx={{ whiteSpace: "nowrap", mt: 'auto', display: 'flex', minWidth: 'unset' }}
                                                                            variant="contained" endIcon={<Iconify icon="eva:eye-fill" />}>
                                                                            詳細
                                                                        </Button>
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>
                                                        </CardContent>
                                                    </Card>
                                                )
                                                )
                                                : <div>No results</div>
                                }
                                {
                                    data && data.results.length > 0 &&
                                    <Pagination
                                        defaultValue={values.page}
                                        count={data.totalPages}
                                        onChange={(event, value) => {
                                            setValue("page", value)
                                        }}
                                        color="primary"
                                        showFirstButton
                                        showLastButton />
                                }
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}