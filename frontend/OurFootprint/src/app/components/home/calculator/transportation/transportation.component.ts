import { Component, OnInit, ViewChild } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { MatTableDataSource, MatTable } from '@angular/material/table'
import { Commute } from 'src/app/models/commute/commute.model'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'

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

  options: string[] = ['One', 'Two', 'Three']
  filteredOptions: Observable<string[]>

  constructor() { }

  ngOnInit(): void {
    // TODO: load previous commutes from that this user entered (do after init?)
    this.filteredOptions = this.commuteForm.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      )
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase()

    return this.options.filter(option => option.toLowerCase().includes(filterValue))
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

  renderTable() {
    if (this.table) { // table can be null when it isn't displayed because of *ngIf
      this.table.renderRows() // The table doesn't re render unless we tell it to. How very non-angular.
    }
  }

}
