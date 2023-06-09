import { Divider, Collapse } from "@mui/material";
import { useState } from "react";
import { Gym } from "../../types";
import GymReviewOverview from "./GymReviewOverview";
import GymReviewForm from "./GymReviewForm";
import GymReviewList from "./GymReviewList";
import { useFeedbackGym } from "../../hooks/useGym";
import useAuth from "../../hooks/useAuth";

type Props = {
    gym: Gym;
};

export default function GymReview({ gym }: Props) {
    const [reviewBox, setReviewBox] = useState(false);
    const { isAuthenticated } = useAuth()
    const { data, isLoading, error } = useFeedbackGym(gym.id)

    const handleOpenReviewBox = () => {
        setReviewBox((prev) => !prev);
    };

    const handleCloseReviewBox = () => {
        setReviewBox(false);
    };

    if (error) return <div>error</div>

    return (
        <>

            <GymReviewOverview gym={gym} onOpen={handleOpenReviewBox} feedbacks={data ? data.results : []} />

            <Divider />
            {
                isAuthenticated &&
                <Collapse in={reviewBox}>
                    <GymReviewForm gym={gym} onClose={handleCloseReviewBox} id="move_add_review" />
                    <Divider />
                </Collapse>
            }
            {
                isLoading ? <>Loading</> : data &&
                    <GymReviewList gym={gym} feedbacks={data.results} />
            }
        </>
    );
}