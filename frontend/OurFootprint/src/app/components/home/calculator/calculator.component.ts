import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'
import { UtilitiesComponent } from './utilities/utilities.component'
import { CalculateService } from 'src/app/services/calculate.service'

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {

  constructor(private calculateService: CalculateService) { }

  ngOnInit(): void {
  }

  // TODO: This method should actually be used in the ngOnInit of the dashboard page
  calculate() {
    this.calculateService.calculateFootprint().subscribe(response => {
      console.log(response)
    })
  }

}
