import { AutocompleteVehicle } from '../vehicle/autocomplete-vehicle.model'

export interface CommuteFormData {
    vehicle: AutocompleteVehicle
    year: {yr: number, tr: string[]}
    transmission: string
    distance: number
    highwayPercent: number
}
