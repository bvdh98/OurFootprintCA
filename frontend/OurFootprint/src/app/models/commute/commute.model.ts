import { CommuteRowData } from './commute-row-data.model'
import { CommuteFormData } from './commute-form-data.model'

export class Commute {
    private vehicleMakeModel: string // TODO: consider making a vehicle model
    private year: number // the year of the vehicle
    private distance: number // distance of commute in km

    // number from 0 to 1 representing the amount of the distance that is driven in highway conditions (vs city)
    private highwayPercent: number

    // the data in the format that the UI table wants it
    private tableFormat: CommuteRowData

    /**
     * Construct a commute object from formdata
     * @param formData data from the input form - see above format
     */
    constructor(formData: CommuteFormData) {
        this.vehicleMakeModel = formData.vehicle.name
        this.year = formData.year.yr
        this.distance = formData.distance
        // TODO: formData.highwayPercent
        this.highwayPercent = 0.5 // formData.highwayPercent

        this.tableFormat = this.getTableFormat()
    }

    /**
     * Gets the commute in a format that the UI table can parse
     * @returns a CommuteRowData model version of the commute that is readable by the UI table
     */
    private getTableFormat(): CommuteRowData {
        return {
            vehicle: `${this.year} ${this.vehicleMakeModel}`, // year make model
            distance: `${this.distance} km`, // ends in km
            highwayPercent: `${this.highwayPercent * 100}%`,
        }
    }
}
