import { GetGymListRequestOptions, Location } from "../types";

export const defaultLocation: Location = { lat: 21.004886675099637, lng: 105.84497349384758 }

export const defaultRadius: number = 10000

export const facilitiesOptions = [
    {value: "pool", label: "プール"},
    {value: "message", label: "マッサージ"},
]

export const defaultGetGymListOptions: GetGymListRequestOptions = {
    distance: defaultRadius,
    lat: defaultLocation.lat,
    lng: defaultLocation.lng,
    limit: 10,
    page: 1,
    name: "",
    facilityTags: [],
}