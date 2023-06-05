export type Location = {
    lat: number
    lng: number
}

export type GetGymListRequestOptions = {
    page?: number
    limit?: number
    lat?: number
    lng?: number
    distance?: number
    name?: string
    facilityTags?: string[]
}

export type GetListResponse<T> = {
    results: T[]
    page: number
    limit: number
    totalPages: number
    totalResults: number
}

export * from "./gym"