import { Gym } from "./gym"

export type Booking = {
    name: string
    email: string
    phone: string
    gym: string | Gym
    from: Date
    to: Date
}