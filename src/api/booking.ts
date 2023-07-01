import { Booking } from "../types";
import axios from "../utils/axios";

export const postBooking = async (booking: Booking) => {
    const { data } = await axios.post("/booking", {
        ...booking
    })
    return data
}