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

  message = 'test'

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.message = this.utilities.filename
  }
  // OUTDATED
  receiveMessage($event) {
    this.message = $event
  }

  // quick test method rto update the string
  refresh() {
    this.message = this.utilities.filename
  }

}
