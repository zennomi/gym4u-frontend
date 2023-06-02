import { Box, OutlinedInput, InputAdornment, Container, Button, Grid, Typography } from "@mui/material";
import Iconify from "../../components/Iconify";
import HeroIllustration from "../../assets/illustration_hero";

export default function Hero() {
    return (
        <Container sx={(theme) => ({
            paddingTop: theme.spacing(10),
            [theme.breakpoints.up('md')]: {
                paddingTop: theme.spacing(15),
            },
        })}>
            <Box mx={"120px"} display={"flex"} justifyContent={"space-between"}>
                <OutlinedInput
                    id="standard-adornment-amount"
                    startAdornment={<InputAdornment position="start"><Iconify icon="eva:search-fill" /></InputAdornment>}
                    fullWidth
                />
                <Button
                    variant="contained"
                    sx={{ ml: 5, px: 5, whiteSpace: 'nowrap' }}
                >
                    模索
                </Button>
            </Box>
            <Grid container mt={10}>
                <Grid item sm={6}>
                    <HeroIllustration sx={{ width: "100%" }} />
                </Grid>
                <Grid item sm={6} textAlign="center" px={5}>
                    <Box display="flex" flexDirection="column" justifyContent="center" height="100%" >
                        <Typography color="primary.main" fontWeight={"bold"} fontSize={48}>
                            いっしょに練習する
                        </Typography>
                        <Typography>
                            これはジムを見つけて、練習を指導する教師を見つけるのを助けるウェブサイトです。 最高のサービスを体験してください。
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}