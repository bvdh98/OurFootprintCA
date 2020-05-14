export interface CommuteRowData {
    vehicle: string // year make model transmission
    distance: string // distance of commute in km
    // frequency: string // frequency per month
    highwayPercent: string // number from 0 to 1 representing the amount of the distance that is driven in highway conditions (vs city)
}
