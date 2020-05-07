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

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() { }

  // quick test method to update the string
  receiveFile() {
    this.fileFortis = this.utilities.getFortisFile()
    this.fileHydro = this.utilities.getHydroFile()
  }

}
