import { Gym } from "./gym"

export type Booking = {
    id: string
    name: string
    email: string
    phone: string
    gym: string | Gym
    from: Date
    to: Date
    createdAt: Date
    updatedAt: Date
}