import { GetListResponse, Feedback } from "../types";
import axios from "../utils/axios";

export const getFeedbacksByGymId = async (gymId: string): Promise<GetListResponse<Feedback>> => {
    const { data } = await axios({
        method: "GET",
        url: "/feedback",
        params: {
            gym: gymId,
            populate: "user",
            limit: 100
        }
    })
    return data
}