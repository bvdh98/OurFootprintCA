export interface CommuteRowData {
    id: number // the id of the row in the database, used for deleting
    vehicle: string // year make model transmission
    distance: string // distance of commute in km
    // frequency: string // frequency per month
    highwayPercent: string // number from 0 to 1 representing the amount of the distance that is driven in highway conditions (vs city)
}
