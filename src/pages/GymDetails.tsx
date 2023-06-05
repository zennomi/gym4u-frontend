import { useParams } from "react-router"
import Page from "../components/Page"
import { Card, Container, Grid } from "@mui/material"
import { useGym } from "../hooks/useGym"
import GymDetailsCarousel from "../sections/gym-details/GymDetailsCarousel"
import GymDetailsSummary from "../sections/gym-details/GymDetailsSummary"

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
                            <Card>
                                <Grid container>
                                    <Grid item xs={12} md={6} lg={7}>
                                        <GymDetailsCarousel gym={data} />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={5}>
                                        <GymDetailsSummary
                                            gym={data}
                                        />
                                    </Grid>
                                </Grid>
                            </Card>
                }
            </Container>
        </Page>
    )
}