import { GetListResponse, Feedback } from "../types";
import axios from "../utils/axios";

export const getFeedbacksByGymId = async (gymId: string): Promise<GetListResponse<Feedback>> => {
    const { data } = await axios({
        method: "GET",
        url: "/feedback",
        params: {
            gym: gymId,
            populate: "user",
            limit: 100,
            sortBy: "-createdAt"
        }
    })
    return data
}

export const postFeedback = async ({ gymId, rating, content }: { gymId: string, rating: number, content: string }) => {
    const { data } = await axios.post("/feedback", {
        gym: gymId,
        content,
        rating
    })
    return data
}