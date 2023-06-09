import { Gym } from "./gym"
import { User } from "./user"

export type Feedback = {
    gym?: Gym
    user: User
    content: string
    rating: number
    id: string
    _id: string
    
}