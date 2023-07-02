import { Booking, GetListResponse } from "../types";
import axios from "../utils/axios";

export const postBooking = async (booking: Partial<Booking>) => {
    const { data } = await axios.post("/booking", {
        ...booking
    })
    return data
}

export const getBookingsByEmail = async (email: string): Promise<GetListResponse<Booking>> => {
    const { data } = await axios.get("/booking", {
        params: {
            email,
            limit: 100,
            sortBy: "-createdAt",
            populate: 'gym'
        }
    })
    return data
}