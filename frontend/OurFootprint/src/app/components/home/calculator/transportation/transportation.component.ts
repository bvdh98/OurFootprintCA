import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.scss']
})
export class TransportationComponent implements OnInit {
  displayedColumns: string[] = ['vehicle', 'distance', 'frequency'];
  dataSource = [
    {vehicle: '2003 Honda Civic', distance: '10km', frequency: '17'},
    {vehicle: '2003 Honda Civic', distance: '2km', frequency: '3'},
  ];

  currentYear: number = new Date().getFullYear(); // the current year
  endYear = this.currentYear + 1; // car companies like to release next years cars early
  startingYear = 1973; // the beginning of our dataset
  years: number[] = [...Array(this.endYear - this.startingYear + 1).keys()].map(x => x + this.startingYear); // a range from starting year to end year
  
  commuteForm = new FormGroup({
    vehicle: new FormControl(),
    year: new FormControl(),
    distance: new FormControl(),
    frequency: new FormControl(),
  });

  constructor() { }

  ngOnInit(): void {
  }

  // TODO: add logic to add commute to table and store the list of commutes in a meaningful way
  addCommute(): void {
    console.log(this.commuteForm.value);
  }

}
