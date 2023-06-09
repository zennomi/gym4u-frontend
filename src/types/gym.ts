export type Gym = {
    _id: string
    id: string
    images: string[]
    video: string
    facilityTags: string[]
    name: string
    address: string
    location: {
        type: string
        coordinates: string[2]
    }
    phone: string
    price: number
    averageRating: number
    feedbackCount: number
    description: number
    createdAt: Date
    updatedAt: Date
}