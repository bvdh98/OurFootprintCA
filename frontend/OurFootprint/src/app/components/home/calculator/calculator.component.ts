import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'
import { UtilitiesComponent } from './utilities/utilities.component'

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {

  @ViewChild(UtilitiesComponent) utilities

  private fileFortis: File
  private fileHydro: File

  constructor() { }

  ngOnInit(): void {
  }

  calculate() {
    this.fileFortis = this.utilities.getFortisFile()
    this.fileHydro = this.utilities.getHydroFile()
  }

}
