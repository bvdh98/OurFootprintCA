import { AutocompleteVehicle } from '../vehicle/autocomplete-vehicle.model';

export interface CommuteFormData {
    vehicle: AutocompleteVehicle
    year: {yr: number, tr: string[]}
    distance: number
    frequency: number
}
