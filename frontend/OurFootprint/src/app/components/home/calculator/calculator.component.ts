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

  message: string = null

  ngOnInit(): void {
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.message = this.utilities.filename
  }

  // quick test method rto update the string
  refresh() {
    this.message = this.utilities.filename
  }

}
