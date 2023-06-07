import { Divider, Collapse } from "@mui/material";
import { useState } from "react";
import { Gym } from "../../types";
import GymReviewOverview from "./GymReviewOverview";
import GymReviewForm from "./GymReviewForm";
import GymReviewList from "./GymReviewList";

type Props = {
    gym: Gym;
};

export default function GymReview({ gym }: Props) {
    const [reviewBox, setReviewBox] = useState(false);

    const handleOpenReviewBox = () => {
        setReviewBox((prev) => !prev);
    };

    const handleCloseReviewBox = () => {
        setReviewBox(false);
    };

    return (
        <>
            <GymReviewOverview gym={gym} onOpen={handleOpenReviewBox} />

            <Divider />

            <Collapse in={reviewBox}>
                <GymReviewForm onClose={handleCloseReviewBox} id="move_add_review" />
                <Divider />
            </Collapse>

            <GymReviewList gym={gym} />
        </>
    );
}