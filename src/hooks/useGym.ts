import useSWR from "swr/immutable";
import { GetGymListRequestOptions } from "../types";
import { getGym, getGyms } from "../api/gym";

export const useGyms = (options: GetGymListRequestOptions | null) => {
    return useSWR(options ? ["gym-lists", options] : null, () => getGyms(options!))
}

export const useGym = (id: string | null) => {
    return useSWR(id ? ["gym-details", id] : null, () => getGym(id!))
}