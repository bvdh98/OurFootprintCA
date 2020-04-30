import { CommuteRowData } from './commute-row-data.model'

export class Commute {
    private vehicleMakeModel: string // TODO: consider making a vehicle model
    private year: number // the year of the vehicle
    private distance: number // distance of commute in km
    private frequency: number // frequency per month
    private tableFormat: CommuteRowData

    /**
     * Construct a commute object from formdata
     * Form data object:
     * {
     *    vehicle: string, // make model
     *    year: number,
     *    distance: number,
     *    frequency: number,
     * }
     * @param formData data from the input form - see above format
     * TODO: explicit parameter type
     */
    constructor(formData: any) {
        this.vehicleMakeModel = formData.vehicle
        this.year = formData.year
        this.distance = formData.distance
        this.frequency = formData.frequency

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
            frequency: `${this.frequency}`,
        }
    }
}
