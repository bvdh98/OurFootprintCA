import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'
import { UtilitiesComponent } from './utilities/utilities.component'

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {

  @ViewChild(UtilitiesComponent) utilities

  constructor() { }

  ngOnInit(): void {
  }

  calculate() {
    // TODO: send the calculation request to back end
  }

}
