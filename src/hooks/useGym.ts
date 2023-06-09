import useSWR from "swr/immutable";
import { GetGymListRequestOptions } from "../types";
import { getGym, getGyms } from "../api/gym";
import { getFeedbacksByGymId } from "../api/feedback";

export const useGyms = (options: GetGymListRequestOptions | null) => {
    return useSWR(options ? ["gym-lists", options] : null, () => getGyms(options!))
}

export const useGym = (id: string | null) => {
    return useSWR(id ? ["gym-details", id] : null, () => getGym(id!))
}

export const useFeedbackGym = (id: string | null) => {
    return useSWR(id ? ["gym-feedbacks", id] : null, () => getFeedbacksByGymId(id!))
}