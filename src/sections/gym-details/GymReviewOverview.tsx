import { Button, Grid, LinearProgress, Link, Rating, Stack, Typography, styled } from "@mui/material";
import { groupBy, sumBy } from "lodash"

import { Feedback, Gym } from "../../types";
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
    feedbacks: Feedback[]
    onOpen: VoidFunction;
};

export default function GymReviewOverview({ gym, feedbacks, onOpen }: Props) {
    // const { totalRating, totalReview, ratings } = gym;
    const totalRating = 4.7
    const total = feedbacks.length;

    const groups = groupBy(feedbacks, (f) => f.rating)

    return (
        <Grid container>
            <GridStyle item xs={12} md={4}>
                <Typography variant="subtitle1" gutterBottom>
                    平均評価
                </Typography>
                <Typography variant="h2" gutterBottom sx={{ color: 'error.main' }}>
                    {gym.averageRating.toFixed(2)}/5
                </Typography>
                <RatingStyle readOnly value={gym.averageRating} precision={0.1} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ({fShortenNumber(gym.feedbackCount)}
                    &nbsp;レビュー)
                </Typography>
            </GridStyle>

            <GridStyle item xs={12} md={4}>
                <Stack spacing={1.5} sx={{ width: 1 }}>
                    {/* {ratings
                        .slice(0)
                        .reverse()
                        .map((rating) => (
                        ))} */}
                    {
                        Object.entries(groups).map(([rating, feedbacks]) => (
                            <ProgressItem key={rating} rating={rating} count={feedbacks.length} total={total} />
                        ))
                    }
                </Stack>
            </GridStyle>

            <GridStyle item xs={12} md={4}>
                <Button
                    size="large"
                    onClick={onOpen}
                    variant="outlined"
                    startIcon={<Iconify icon={'eva:edit-2-fill'} />}
                >
                    コメント
                </Button>
            </GridStyle>
        </Grid>
    );
}

// ----------------------------------------------------------------------

type ProgressItemProps = {
    rating: string
    total: number
    count: number
};

function ProgressItem({ rating, total, count }: ProgressItemProps) {
    return (
        <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography variant="subtitle2">{rating} スター</Typography>
            <LinearProgress
                variant="determinate"
                value={(count / total) * 100}
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
                {fShortenNumber(count)}
            </Typography>
        </Stack>
    );
}