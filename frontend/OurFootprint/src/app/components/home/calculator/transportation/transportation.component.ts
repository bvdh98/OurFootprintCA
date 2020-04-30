import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatTable } from '@angular/material/table';

@Component({
  selector: 'app-transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.scss']
})
export class TransportationComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;

  readonly displayedColumns: string[] = ['vehicle', 'distance', 'frequency'];
  dataSource = new MatTableDataSource<any>();

  // ? Consider if this should be static, as a separate instance is not needed for each object.
  readonly endYear = new Date().getFullYear() + 1; // plus one because car companies like to release next years cars early
  readonly startingYear = 1973; // the beginning of our dataset
  // a range from end year to starting year
  readonly years: number[] = [...Array(this.endYear - this.startingYear).keys()].map(x => this.endYear - x);

  commuteForm = new FormGroup({
    vehicle: new FormControl(),
    year: new FormControl(),
    distance: new FormControl(),
    frequency: new FormControl(),
  });

  constructor() { }

  ngOnInit(): void {
    // TODO: load previous commutes from that this user entered (do after init?)
  }

  addCommute(): void {
    // TODO: Should use model objects for the form data (commuteFormData) and the rows (commute)
    // TODO: commute should probably use a vehicle object (another model)
    // Map the data to an object in the format that the row wants
    const data = ((d) => {
      return {vehicle: `${d.year} ${d.vehicle}`, distance: `${d.distance}km`, frequency: `${d.frequency}`};
    })(this.commuteForm.value);
    this.dataSource.data.push(data);
    this.commuteForm.reset();
    if (this.table) { // table can be null when it isn't displayed because of *ngIf
      this.table.renderRows(); // The table doesn't re render unless we tell it to. How very non-angular.
    }
  }

}
