import { Avatar, Box, Button, List, ListItem, Pagination, Rating, Typography } from "@mui/material";
import { Feedback, Gym } from "../../types";
import { useState } from "react";
import Iconify from "../../components/Iconify";
import { fShortenNumber } from "../../utils/formatNumber";
import { fDate } from "../../utils/formatTime";

type Props = {
    gym: Gym;
    feedbacks: Feedback[]
};

export default function GymReviewList({ gym, feedbacks }: Props) {

    const [page, setPage] = useState(1)
    const limit = 5

    return (
        <Box sx={{ pt: 3, px: 2, pb: 5 }}>
            <List disablePadding>
                {feedbacks.slice((page - 1) * limit, page * limit).map((feedback) => (
                    <ReviewItem key={feedback._id} feedback={feedback} />
                ))}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination count={Math.floor(feedbacks.length / limit)} onChange={(event, value) => setPage(value)} color="primary" />
            </Box>
        </Box>
    );
}

// ----------------------------------------------------------------------

function ReviewItem({ feedback }: { feedback: Feedback }) {
    const [isHelpful, setHelpfuls] = useState(false);
    const { user } = feedback

    const handleClickHelpful = () => {
        setHelpfuls((prev) => !prev);
    };

    return (
        <>
            <ListItem
                disableGutters
                sx={{
                    mb: 5,
                    alignItems: 'flex-start',
                    flexDirection: { xs: 'column', sm: 'row' },
                }}
            >
                <Box
                    sx={{
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center',
                        mb: { xs: 2, sm: 0 },
                        minWidth: { xs: 160, md: 240 },
                        textAlign: { sm: 'center' },
                        flexDirection: { sm: 'column' },
                    }}
                >
                    <Avatar
                        src={user.avatar}
                        sx={{
                            mr: { xs: 2, sm: 0 },
                            mb: { sm: 2 },
                            width: { md: 64 },
                            height: { md: 64 },
                        }}
                    />
                    <div>
                        <Typography variant="subtitle2" noWrap>
                            {user.name}
                        </Typography>
                        {/* <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
                            {fDate(postedAt)}
                        </Typography> */}
                    </div>
                </Box>

                <div>
                    <Rating size="small" value={feedback.rating} precision={0.01} readOnly />

                    {/* {isPurchased && (
                        <Typography
                            variant="caption"
                            sx={{
                                my: 1,
                                display: 'flex',
                                alignItems: 'center',
                                color: 'primary.main',
                            }}
                        >
                            <Iconify icon={'ic:round-verified'} width={16} height={16} />
                            &nbsp;Verified purchase
                        </Typography>
                    )} */}

                    <Typography variant="body2">{feedback.content}</Typography>

                    {/* <Box
                        sx={{
                            mt: 1,
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                        }}
                    >
                        {!isHelpful && (
                            <Typography variant="body2" sx={{ mr: 1 }}>
                                Was this review helpful to you?
                            </Typography>
                        )}

                        <Button
                            size="small"
                            color="inherit"
                            startIcon={<Iconify icon={!isHelpful ? 'ic:round-thumb-up' : 'eva:checkmark-fill'} />}
                            onClick={handleClickHelpful}
                        >
                            {isHelpful ? 'Helpful' : 'Thank'}({fShortenNumber(!isHelpful ? helpful : helpful + 1)}
                            )
                        </Button>
                    </Box> */}
                </div>
            </ListItem>
        </>
    );
}
