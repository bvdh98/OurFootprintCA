import { Component, OnInit } from '@angular/core'
import { CalculateService } from 'src/app/services/calculate.service'

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
