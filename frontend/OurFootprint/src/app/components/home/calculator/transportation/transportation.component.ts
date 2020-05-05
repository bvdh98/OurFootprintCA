import { Component, OnInit, ViewChild } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { MatTableDataSource, MatTable } from '@angular/material/table'
import { Commute } from 'src/app/models/commute/commute.model'
import { Observable } from 'rxjs'
import { map, startWith, timeout } from 'rxjs/operators'

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
  readonly startingYear = 1973 // the beginning of our dataset
  // a range from end year to starting year
  readonly years: number[] = [...Array(this.endYear - this.startingYear).keys()].map(x => this.endYear - x)

  // TODO: better form validation
  commuteForm = new FormGroup({
    vehicle: new FormControl(),
    year: new FormControl(),
    distance: new FormControl(),
    frequency: new FormControl(),
  })

  vehicles: Array<{years: number[], name: string}> = [
    {years: [1985, 1984, 1984], name: 'Alfa Romeo Spider Veloce 2000'},
    {years: [1985, 1986, 1987, 1988, 1989, 1990, 1991, 1991, 1992], name: 'Ferrari Testarossa'},
    {years: [1984, 1985, 1986, 1987, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020], name: 'Dodge Charger'},
    {years: [1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994], name: 'Dodge B150/B250 Wagon 2WD'},
    {years: [1993, 1994, 1994, 1992, 1992, 1993], name: 'Subaru Legacy AWD Turbo'},
    {years: [1993, 1993, 1990, 1990, 1990, 1991, 1991, 1992, 1992], name: 'Subaru Loyale'},
    {years: [1993], name: 'Toyota Corolla'},
    {years: [1993, 1994, 1995, 1998, 1999, 1999, 2001, 2001, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020], name: 'Volkswagen Golf III / GTI'}, {years: [1993, 1994, 1995, 1996, 1997, 1998, 1999, 2001, 1989, 1989, 1990, 1991, 1991, 1992], name: 'Volkswagen Jetta III'},
    {years: [1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1995, 1996, 1997, 1998, 1999], name: 'Volvo 240'}]
  filteredVehicles: Observable<{years: number[], name: string}[]>

  constructor() { }

  ngOnInit(): void {
    // TODO: load previous commutes from that this user entered (do after init?)
    // TODO: consider using listeners instead of (click) in html
    this.filteredVehicles = this.commuteForm.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterVehicles(value.vehicle))
      )
  }

  private _filterVehicles(value: string): {years: number[], name: string}[] {
    if (value === undefined) { return [] }
    const filterValue = value.toLowerCase()
    return this.vehicles.filter(car => car.name.toLowerCase().includes(filterValue))
  }

  addCommute(): void {
    this.dataSource.data.push(new Commute(this.commuteForm.value))
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
