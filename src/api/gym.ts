import { GetGymListRequestOptions, GetListResponse, Gym } from "../types";
import axios from "../utils/axios";

export const getGyms = async (options: GetGymListRequestOptions): Promise<GetListResponse<Gym>> => {
    if (!options.name) delete options.name
    const { data } = await axios({
        method: "GET",
        url: "/gym",
        params: options
    })
    return data
}

export const getGym = async (id: string): Promise<Gym> => {
    const { data } = await axios({
        method: "GET",
        url: `/gym/${id}`,
    })
    return data
}