import { Typography, Stack, Rating, Divider, Button, styled, Box, useTheme, Link } from "@mui/material";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Link as RouterLink } from "react-router-dom";

import Iconify from "../../components/Iconify";
import Label from "../../components/Label";
import { Gym } from "../../types";
import { fShortenNumber, fCurrency } from "../../utils/formatNumber";
import GymVideo from "./GymVideo";
import { PATH_PAGE } from "../../routes/paths";

const RootStyle = styled('div')(({ theme }) => ({
    padding: theme.spacing(3),
    [theme.breakpoints.up(1368)]: {
        padding: theme.spacing(2, 2),
    },
}));


type Props = {
    gym: Gym;
};

export default function GymDetailsSummary({
    gym,
    ...other
}: Props) {
    const theme = useTheme();

    const handle = useFullScreenHandle();

    const {
        name,
        price,
        facilityTags,
        address,
        phone,
    } = gym;

    return (
        <RootStyle {...other}>
            {
                facilityTags.map(f => (
                    <Label
                        variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                        color="success"
                        sx={{ textTransform: 'uppercase', mr: 0.5 }}
                        key={f}
                    >
                        {f}
                    </Label>
                ))
            }

            <Typography variant="h3" paragraph sx={{ mt: 2 }}>
                {name}
            </Typography>

            <Typography
                variant="subtitle2"
                sx={{
                    mt: 2,
                    display: 'block',
                }}
            >
                <Iconify icon="eva:phone-fill" /> 電話番号: {phone}
            </Typography>

            <Typography
                variant="subtitle2"
                sx={{
                    mb: 2,
                    display: 'block',
                }}
            >
                <Iconify icon="carbon:location-filled" /> 住所: {address}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Rating value={gym.averageRating} precision={0.1} readOnly />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ({fShortenNumber(gym.feedbackCount)} reviews)
                </Typography>
            </Stack>

            <Typography variant="h4" sx={{ mb: 3 }}>
                {fCurrency(price)}/1ヶ月
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
                {gym.description}
            </Typography>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack direction="row" spacing={2} sx={{ mt: 5, mb: 2 }}>
                <Button
                    fullWidth
                    size="large"
                    color="warning"
                    variant="contained"
                    startIcon={<Iconify icon={'eva:video-fill'} />}
                    sx={{ whiteSpace: 'nowrap' }}
                    onClick={handle.enter}
                >
                    紹介ビデオ
                </Button>
                <Link
                    component={RouterLink}
                    to={PATH_PAGE.gymBooking(gym.id)}
                    sx={{ display: 'block', width: "100%" }}
                >
                    <Button
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        startIcon={<Iconify icon={'map:gym'} />}
                    >
                        ブッキング
                    </Button>
                </Link>
            </Stack>
            <FullScreen handle={handle}>
                <Box>
                    <GymVideo url={gym.video || "https://www.youtube.com/watch?v=PCZ2JHaPvZ4&ab_channel=ANLLELASAGRA"} playing={true} muted={true} />
                </Box>
            </FullScreen>
            {/* 
                <Stack alignItems="center" sx={{ mt: 3 }}>
                    <SocialsButton initialColor />
                </Stack> */}
        </RootStyle >
    );
}