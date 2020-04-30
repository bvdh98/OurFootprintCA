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
  dataSource = new MatTableDataSource<any>()

  // ? is it worth it to make this static if we need an instance of years anyways?
  static readonly currentYear: number = new Date().getFullYear(); // the current year
  static readonly endYear = TransportationComponent.currentYear + 1; // car companies like to release next years cars early
  static readonly startingYear = 1973; // the beginning of our dataset
  static readonly years: number[] = 
    [...Array(TransportationComponent.endYear).keys()].slice(TransportationComponent.startingYear).reverse();   // a range from end year to starting year
  getYears() {return TransportationComponent.years;} // access years as an instance without saving a copy

  // ? Alternative way to calculate years. Consider
  // years: number[] = 
  //   [...Array(TransportationComponent.endYear - TransportationComponent.startingYear + 1).keys()].map(x => TransportationComponent.endYear - x);
  
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
    const data = ((data) => {
      return {vehicle: `${data.year} ${data.vehicle}`, distance: `${data.distance}km`, frequency: `${data.frequency}`}
    })(this.commuteForm.value);
    this.dataSource.data.push(data);
    this.commuteForm.reset();
    if (this.table) // table can be null when it isn't displayed because of *ngIf
      this.table.renderRows(); // The table doesn't re render unless we tell it to. How very non-angular.
  }

}
