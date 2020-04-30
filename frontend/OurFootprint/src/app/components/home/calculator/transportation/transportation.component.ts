import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
