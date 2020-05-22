import { Component, OnInit, ViewChild } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatTableDataSource, MatTable } from '@angular/material/table'
import { Commute } from 'src/app/models/commute/commute.model'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { AutocompleteVehicle } from 'src/app/models/vehicle/autocomplete-vehicle.model'
import { VehicleService } from 'src/app/services/vehicle.service'
import { CommuteFormData } from 'src/app/models/commute/commute-form-data.model'
import { CommuteService } from 'src/app/services/commute.service'
import { CommuteRowData } from 'src/app/models/commute/commute-row-data.model'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.scss'],
})
export class TransportationComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<Commute>

  readonly displayedColumns: string[] = ['vehicle', 'distance', 'highwayPercent', 'delete']
  dataSource = new MatTableDataSource<CommuteRowData>()

  // ? Consider if this should be static, as a separate instance is not needed for each object.
  readonly endYear = new Date().getFullYear() + 1 // plus one because car companies like to release next years cars early
  readonly startingYear = 1984 // the beginning of our dataset
  // a range from end year to starting year
  readonly defaultYears = [...Array(this.endYear - this.startingYear + 1).keys()].map(x => this.endYear - x)
  yearTransmissions: Observable<{yr: number, tr: string[]}[]>
  transmissions: string[] = []

  // min max values for form validation
  readonly minDistance: number = 0
  readonly maxDistance: number = 1000

  // TODO: better form validation
  commuteForm = new FormGroup({
    vehicle: new FormControl(),
    year: new FormControl({value: '', disabled: true}),
    transmission: new FormControl(),
    distance: new FormControl('', [Validators.min(this.minDistance), Validators.max(this.maxDistance)]),
    highwayPercent: new FormControl(),
  })

  vehicles: Array<AutocompleteVehicle> = []
  filteredVehicles: Observable<AutocompleteVehicle[]>

  constructor(private vehicleService: VehicleService, private commuteService: CommuteService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // TODO: consider using listeners instead of (click) in html

    // Load previous commutes from that this user entered
    this.commuteService.getCommutes().pipe(
      // make sure an array was returned before calling map on it
      // convert the commutes into a format that the ui table can read
      map((commutes: Commute[]) => commutes.map ? commutes.map(commute => Commute.getTableFormat(commute)) : [])
    ).subscribe((commutes: CommuteRowData[]) =>
      this.dataSource.data.push(...commutes)
    )

    // get the vehicles from the back end
    this.vehicleService.getVehicles().toPromise().then(vehicles => this.vehicles = vehicles)

    // set up autocomplete filter for vehicles
    this.filteredVehicles = this.commuteForm.controls.vehicle.valueChanges.pipe(
      map(vehicle => vehicle && vehicle.name ? vehicle.name : vehicle),
      map(name => name ? this._filterVehicles(name) : []),
      map(vehicles => vehicles.slice(0, 20))
      // TODO: append something to make it clear to the user that there are more than 20 results if there are more than 20 results
    )

    // set up automatic allowed years range
    this.yearTransmissions = this.commuteForm.controls.vehicle.valueChanges.pipe(
        map((vehicle: AutocompleteVehicle) => vehicle ? vehicle.details : [])
    )

    // enable the year drop down if a valid vehicle is selected from the dropdown else disable + reset it
    this.commuteForm.controls.vehicle.valueChanges.subscribe((vehicle: string | AutocompleteVehicle) => {
      if (vehicle && (vehicle as AutocompleteVehicle).details) {
        this.commuteForm.controls.year.enable()
      } else {
        this.commuteForm.controls.year.disable()
        this.commuteForm.controls.year.reset() // needed to make sure the transmission dropdown only shows up when needed
      }
    })

    // display available transmissions for the given year
    this.commuteForm.controls.year.valueChanges.subscribe(yearTransmission =>
      this.transmissions = yearTransmission && (yearTransmission as {tr: string[]}).tr ? yearTransmission.tr : []
    )
  }

  displayVehicle(vehicle: AutocompleteVehicle): string {
    return vehicle && vehicle.name ? vehicle.name : ''
  }

  displayYearTransmisson(yearTransmission: {yr: number, tr: string[]}): number {
    return yearTransmission && yearTransmission.yr ? yearTransmission.yr : NaN
  }

  private _filterVehicles(value: string): AutocompleteVehicle[] {
    if (!value) { return [] }
    const filterValue = value.toLowerCase()
    return this.vehicles.filter(car => car.name.toLowerCase().includes(filterValue))
  }

  addCommute(): void {
    const commute: Commute = new Commute((this.commuteForm.value as CommuteFormData))

    // send the commute to the back end
    this.commuteService.addCommute(commute).toPromise().then((responseCommute: Commute) => {
      // display the commute in the table
      this.dataSource.data.push(Commute.getTableFormat(responseCommute))
      this.renderTable()

      // clear the form
      this.commuteForm.reset()
    }, error => {
      console.error(error)
      this.snackBar.open('An error occurred while adding that commute! (Promise rejected)', 'Ok', {duration: 5000})
    })
  }

  deleteCommute(id: number, row: number): void {
    this.commuteService.deleteCommute(id).toPromise()

    this.dataSource.data.splice(row, 1) // deletes the row
    this.renderTable()
  }

  private renderTable() {
    if (this.table) { // table can be null when it isn't displayed because of *ngIf
      this.table.renderRows() // The table doesn't re render unless we tell it to. How very non-angular.
    }
  }

}
