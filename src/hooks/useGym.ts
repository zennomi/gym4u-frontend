import useSWR from "swr/immutable";
import { GetGymListRequestOptions } from "../types";
import { getGyms } from "../api/gym";

export const useGyms = (options: GetGymListRequestOptions | null) => {
    return useSWR(options ? ["gym-lists", options] : null, () => getGyms(options!))
}