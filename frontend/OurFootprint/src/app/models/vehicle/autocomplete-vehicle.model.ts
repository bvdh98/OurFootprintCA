/**
 * Autocomplete vehicle
 * {'transmission': {'1985': ['Manual 5-spd'], '1984': ['Manual 5-spd']}, 'name': 'Alfa Romeo Spider Veloce 2000'}
 */
export interface AutocompleteVehicle {
    name: string
    transmission: {[year: number]: string[]}
}
