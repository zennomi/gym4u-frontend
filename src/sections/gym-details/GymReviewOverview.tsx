import { Button, Grid, LinearProgress, Link, Rating, Stack, Typography, styled } from "@mui/material";
import { sumBy } from "lodash"

import { Gym } from "../../types";
import Iconify from "../../components/Iconify";
import { fShortenNumber } from "../../utils/formatNumber";



const RatingStyle = styled(Rating)(({ theme }) => ({
    marginBottom: theme.spacing(1),
}));

const GridStyle = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    '&:nth-of-type(2)': {
        [theme.breakpoints.up('md')]: {
            borderLeft: `solid 1px ${theme.palette.divider}`,
            borderRight: `solid 1px ${theme.palette.divider}`,
        },
    },
}));

type Props = {
    gym: Gym;
    onOpen: VoidFunction;
};

export default function GymReviewOverview({ gym, onOpen }: Props) {
    // const { totalRating, totalReview, ratings } = gym;
    const totalRating = 4.7
    const totalReview = 5200
    const ratings = [{ name: "5 スター", starCount: 5, reviewCount: 50000 }, { name: "4 スター", starCount: 4, reviewCount: 35000 }]
    const total = sumBy(ratings, (star) => star.starCount);

    return (
        <Grid container>
            <GridStyle item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                    Average rating
                </Typography>
                <Typography variant="h2" gutterBottom sx={{ color: 'error.main' }}>
                    {totalRating}/5
                </Typography>
                <RatingStyle readOnly value={totalRating} precision={0.1} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ({fShortenNumber(totalReview)}
                    &nbsp;reviews)
                </Typography>
            </GridStyle>

            <GridStyle item xs={12} md={4}>
                <Stack spacing={1.5} sx={{ width: 1 }}>
                    {ratings
                        .slice(0)
                        .reverse()
                        .map((rating) => (
                            <ProgressItem key={rating.name} star={rating} total={total} />
                        ))}
                </Stack>
            </GridStyle>

            <GridStyle item xs={12} md={4}>
                <Link href="#move_add_review" underline="none">
                    <Button
                        size="large"
                        onClick={onOpen}
                        variant="outlined"
                        startIcon={<Iconify icon={'eva:edit-2-fill'} />}
                    >
                        Write your review
                    </Button>
                </Link>
            </GridStyle>
        </Grid>
    );
}

// ----------------------------------------------------------------------

type StarRating = {
    name: string;
    starCount: number;
    reviewCount: number;
};

type ProgressItemProps = {
    star: StarRating;
    total: number;
};

function ProgressItem({ star, total }: ProgressItemProps) {
    const { name, starCount, reviewCount } = star;
    return (
        <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography variant="subtitle2">{name}</Typography>
            <LinearProgress
                variant="determinate"
                value={(starCount / total) * 100}
                sx={{
                    mx: 2,
                    flexGrow: 1,
                    bgcolor: 'divider',
                }}
            />
            <Typography
                variant="body2"
                sx={{ color: 'text.secondary', minWidth: 64, textAlign: 'right' }}
            >
                {fShortenNumber(reviewCount)}
            </Typography>
        </Stack>
    );
}