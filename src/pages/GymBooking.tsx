import { Box, Container, Grid } from "@mui/material";
import { useParams } from "react-router";
import { useGym } from "../hooks/useGym";
import LoadingScreen from "../components/LoadingScreen";
import GymPreview from "../sections/booking/GymPreview";
import Page from "../components/Page";
import BookingForm from "../sections/booking/BookingForm";

export default function GymBooking() {
    const { id } = useParams()
    const { data, isLoading, error } = useGym(id || null)

    if (isLoading) return <LoadingScreen />

    if (error) return <>Error</>

    return (
        <Page title="Gym Booking">
            <Container sx={(theme) => ({
                paddingTop: theme.spacing(10),
                [theme.breakpoints.up('md')]: {
                    paddingTop: theme.spacing(15),
                },
            })}>
                <Grid container>
                    <Grid item xs={9}>
                        <Box px={2}>
                            {
                                data &&
                                <BookingForm gym={data} />
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        {
                            data &&
                            <GymPreview gym={data} />
                        }
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}