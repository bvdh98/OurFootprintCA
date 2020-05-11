/**
 * Autocomplete vehicle
 * {'details: [{'yr': 1985, 'tr': ['Manual 5-spd']}, {'yr': 1984, 'tr': ['Manual 5-spd']}], 'name': 'Alfa Romeo Spider Veloce 2000'}
 */
export interface AutocompleteVehicle {
    name: string
    details: [{yr: number, tr: string[]}] // TODO: add an interface for this
}
