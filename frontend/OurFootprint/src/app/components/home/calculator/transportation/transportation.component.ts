import { Component, OnInit, ViewChild } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatTableDataSource, MatTable } from '@angular/material/table'
import { Commute } from 'src/app/models/commute/commute.model'
import { Observable } from 'rxjs'
import { map, startWith, timeout } from 'rxjs/operators'
import { AutocompleteVehicle } from 'src/app/models/vehicle/autocomplete-vehicle.model'
import { VehicleService } from 'src/app/services/vehicle.service'

@Component({
  selector: 'app-transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.scss'],
})
export class TransportationComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<Commute>

  readonly displayedColumns: string[] = ['vehicle', 'distance', 'frequency', 'delete']
  dataSource = new MatTableDataSource<Commute>()

  // ? Consider if this should be static, as a separate instance is not needed for each object.
  readonly endYear = new Date().getFullYear() + 1 // plus one because car companies like to release next years cars early
  readonly startingYear = 1984 // the beginning of our dataset
  // a range from end year to starting year
  readonly defaultYears = [...Array(this.endYear - this.startingYear + 1).keys()].map(x => this.endYear - x)
  yearTransmissions: Observable<{yr: number, tr: string[]}[]>
  // years: Observable<number[]>

  // min max values for form validation
  readonly minDistance: number = 0
  readonly maxDistance: number = 250
  readonly minFrequency: number = 0
  readonly maxFrequency: number = 60

  // TODO: better form validation
  commuteForm = new FormGroup({
    vehicle: new FormControl(),
    year: new FormControl({value: '', disabled: true}),
    distance: new FormControl('', [Validators.min(this.minDistance), Validators.max(this.maxDistance)]),
    frequency: new FormControl('', [Validators.min(this.minFrequency), Validators.max(this.maxFrequency)]),
  })

  vehicles: Array<AutocompleteVehicle> = []
  filteredVehicles: Observable<AutocompleteVehicle[]>

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    // TODO: load previous commutes from that this user entered (do after init?)
    // TODO: consider using listeners instead of (click) in html

    // get the vehicles from the back end
    this.vehicleService.getVehicles().subscribe(vehicles => this.vehicles = vehicles)

    // set up autocomplete filter for vehicles
    this.filteredVehicles = this.commuteForm.controls.vehicle.valueChanges.pipe(
      startWith(''),
      map(vehicle => vehicle && vehicle.name ? vehicle.name : vehicle),
      map(name => name ? this._filterVehicles(name) : []),
      map(vehicles => vehicles.slice(0, 20))
      // TODO: append something to make it clear to the user that there are more than 20 results if there are more than 20 results
    )

    // set up automatic allowed years range
    this.yearTransmissions = this.commuteForm.controls.vehicle.valueChanges.pipe(
        startWith([]),
        map((vehicle: AutocompleteVehicle) => vehicle ? vehicle.details : [])
    )

    this.commuteForm.controls.vehicle.valueChanges.subscribe((vehicle: string | AutocompleteVehicle) => {
      if ((vehicle as AutocompleteVehicle).details) {
        this.commuteForm.controls.year.enable()
      } else {
        this.commuteForm.controls.year.disable()
      }
    })
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
    this.dataSource.data.push(new Commute(this.commuteForm.value))
    console.log(this.commuteForm.value.vehicle)
    this.commuteForm.reset()
    this.renderTable()
  }

  deleteCommute(row: number): void {
    this.dataSource.data.splice(row, 1) // deletes the row
    this.renderTable()
  }

  private renderTable() {
    if (this.table) { // table can be null when it isn't displayed because of *ngIf
      this.table.renderRows() // The table doesn't re render unless we tell it to. How very non-angular.
    }
  }

}
