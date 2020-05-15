import { CommuteRowData } from './commute-row-data.model'
import { CommuteFormData } from './commute-form-data.model'

export class Commute {
    // tslint:disable-next-line: variable-name
    commute_id: number // the id of the row in the database, used for deleting
    private vehicle: string // TODO: consider making a vehicle model
    private year: number // the year of the vehicle
    private distance: number // distance of commute in km
    private transmission: string // the transmission that the vehicle uses
    // tslint:disable-next-line: variable-name
    private highway_perc: number // number from 0 to 1 representing the amount of the distance that is driven in highway conditions vs city

    /**
     * Construct a commute object from formdata
     * @param formData data from the input form - see above format
     */
    constructor(formData: CommuteFormData) {
        this.commute_id = null
        this.vehicle = formData.vehicle.name
        this.year = formData.year.yr
        this.distance = formData.distance
        this.highway_perc = formData.highwayPercent / 100
        if (formData.transmission) {
            this.transmission = formData.transmission
        } else if (formData.year.tr.length === 1) {
            this.transmission = formData.year.tr[0]
        } else {
            // TODO: Catch this and show a snack bar
            throw Error('multiple transmissions were available, but none selected')
        }
    }

    /**
     * Gets the commute in a format that the UI table can parse
     * @returns a CommuteRowData model version of the commute that is readable by the UI table
     */
    static getTableFormat(commute: Commute): CommuteRowData {
        return {
            id: commute.commute_id,
            // year make model transmission
            vehicle: `${commute.year} ${commute.vehicle}${commute.transmission ? ` ${commute.transmission}` : ''}`,
            distance: `${commute.distance} km`, // ends in km
            highwayPercent: `${commute.highway_perc * 100}%`,
        }
    }
}
