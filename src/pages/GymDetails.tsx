import { useParams } from "react-router"
import Page from "../components/Page"
import { Card, Container, Grid, Stack } from "@mui/material"
import { useGym } from "../hooks/useGym"
import GymDetailsCarousel from "../sections/gym-details/GymDetailsCarousel"
import GymDetailsSummary from "../sections/gym-details/GymDetailsSummary"
import GymReview from "../sections/gym-details/GymReview"

export default function GymDetails() {
    const { id } = useParams()
    const { data, isLoading, error } = useGym(id || null)

    return (
        <Page title="Gym Details">
            <Container sx={(theme) => ({
                paddingTop: theme.spacing(10),
                [theme.breakpoints.up('md')]: {
                    paddingTop: theme.spacing(15),
                },
            })}>
                {
                    isLoading ? <>Loading...</>
                        : error ? <>Error</>
                            : data &&
                            <Stack spacing={2} mb={2}>
                                <Card>
                                    <Grid container>
                                        <Grid item xs={12} md={6}>
                                            <GymDetailsCarousel gym={data} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <GymDetailsSummary
                                                gym={data}
                                            />
                                        </Grid>
                                    </Grid>
                                </Card>
                                <Card>
                                    <GymReview gym={data} />
                                </Card>
                            </Stack>
                }
            </Container>
        </Page>
    )
}