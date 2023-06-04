import { Location } from "../types";

export const defaultLocation: Location = { lat: 21.004886675099637, lng: 105.84497349384758 }

export const defaultRadius: number = 100

export const facilitiesOptions = [
    "プール",
    "マッサージ"
]

export const defaultGetGymListOptions = {
    radius: defaultRadius,
    lat: defaultLocation.lat,
    lng: defaultLocation.lng,
    limit: 10,
    page: 1,
    name: "",
    facilities: [],
}