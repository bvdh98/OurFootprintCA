import { Component, OnInit, ViewChild } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatTableDataSource, MatTable } from '@angular/material/table'
import { Commute } from 'src/app/models/commute/commute.model'
import { Observable } from 'rxjs'
import { map, startWith, timeout } from 'rxjs/operators'
import { AutocompleteVehicle } from 'src/app/models/vehicle/autocomplete-vehicle.model'

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
  readonly defaultYears = [...Array(this.endYear - this.startingYear).keys()].map(x => this.endYear - x)
  years: Observable<number[]>

  // [...Array(this.endYear - this.startingYear).keys()].map(x => this.endYear - x)

  // min max values for form validation
  readonly minDistance: number = 0
  readonly maxDistance: number = 250
  readonly minFrequency: number = 0
  readonly maxFrequency: number = 60

  // TODO: better form validation
  commuteForm = new FormGroup({
    vehicle: new FormControl(),
    year: new FormControl(),
    distance: new FormControl('', [Validators.min(this.minDistance), Validators.max(this.maxDistance)]),
    frequency: new FormControl('', [Validators.min(this.minFrequency), Validators.max(this.maxFrequency)]),
  })

  vehicles: Array<AutocompleteVehicle> = [
    {years: [1985, 1984, 1984], name: 'Alfa Romeo Spider Veloce 2000'},
    {years: [1985, 1986, 1987, 1988, 1989, 1990, 1991, 1991, 1992], name: 'Ferrari Testarossa'},
    {years: [1984, 1985, 1986, 1987, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020], name: 'Dodge Charger'},
    {years: [1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994], name: 'Dodge B150/B250 Wagon 2WD'},
    {years: [1993, 1994, 1994, 1992, 1992, 1993], name: 'Subaru Legacy AWD Turbo'},
    {years: [1993, 1993, 1990, 1990, 1990, 1991, 1991, 1992, 1992], name: 'Subaru Loyale'},
    {years: [1993], name: 'Toyota Corolla'},
    {years: [1993, 1994, 1995, 1998, 1999, 1999, 2001, 2001, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020], name: 'Volkswagen Golf III / GTI'}, {years: [1993, 1994, 1995, 1996, 1997, 1998, 1999, 2001, 1989, 1989, 1990, 1991, 1991, 1992], name: 'Volkswagen Jetta III'},
    {years: [1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1995, 1996, 1997, 1998, 1999], name: 'Volvo 240'}]
  filteredVehicles: Observable<AutocompleteVehicle[]>

  constructor() { }

  ngOnInit(): void {
    // TODO: load previous commutes from that this user entered (do after init?)
    // TODO: consider using listeners instead of (click) in html
    this.filteredVehicles = this.commuteForm.valueChanges
      .pipe(
        startWith(''),
        map(value => value.vehicle),
        map(vehicle => vehicle && vehicle.name ? vehicle.name : vehicle),
        map(name => name ? this._filterVehicles(name) : this.vehicles.slice())
      )
    this.years = this.commuteForm.valueChanges
      .pipe(
        startWith(this.defaultYears),
        map(value => value.vehicle),
        map(vehicle => vehicle && vehicle.name ? vehicle.years.reverse() : this.defaultYears)
      )
  }

  displayVehicle(vehicle: AutocompleteVehicle): string {
    return vehicle && vehicle.name ? vehicle.name : ''
  }

  private _filterVehicles(value: string): AutocompleteVehicle[] {
    if (!value) { return [] }
    const filterValue = value.toLowerCase()
    return this.vehicles.filter(car => car.name.toLowerCase().includes(filterValue))
  }

  // private _getYears(value: AutocompleteVehicle): number[] {
  //   if (!value) { return [] }
  //   console.log(value)
  //   return [1, 2, 3]
  // }

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
