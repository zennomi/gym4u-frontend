export type Gym = {
    _id: string
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
    description: number
    createdAt: Date
    updatedAt: Date
}