import { Component, OnInit } from '@angular/core'
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js'
import { Color, Label } from 'ng2-charts'

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
})
export class DashBoardComponent implements OnInit {
  totalChartOptions: ChartOptions = {
    responsive: true,
  }
  totalChartLabels: Label[] = ['Your Total Footprint', 'Average User Footprint']
  totalChartType: ChartType = 'bar'
  totalChartLegend = true
  totalChartPlugins = []
  totalChartData: ChartDataSets[]

  fortisChartLabels: Label[] = ['jan', 'feb', 'march', 'april', 'may', 'June', 'July']
  fortisChartData: ChartDataSets[]
  fortisChartType: ChartType = 'bar'
  fortisChartPlugins = []
  fortisChartLegend = true
  fortisChartOptions: ChartOptions = {
    responsive: true,
  }

  hydroChartOptions: ChartOptions = {
    responsive: true,
  }
  hydroChartLabels: Label[] = ['jan', 'feb', 'march']
  hydroChartType: ChartType = 'bar'
  hydroChartLegend = true
  hydroChartPlugins = []
  hydroChartData: ChartDataSets[]

  vehicleChartOptions: ChartOptions = {
    responsive: true,
  }
  vehicleChartLabels: Label[] = ['Total Commute Footprint monthly', 'Average user monthly  Footprint']
  vehicleChartType: ChartType = 'bar'
  vehicleChartLegend = true
  vehicleChartPlugins = []
  vehicleChartData: ChartDataSets[]


  constructor() { }

  // TODO: Remove hardcoded data
  readonly userdata = {
    fortis: [{ start_date: '2020-03-24', end_date: '2020-04-21', num_days: 29, consumption: 5.4, footprint: 0.0038826 },
    { start_date: '2020-02-22', end_date: '2020-03-23', num_days: 31, consumption: 8.6, footprint: 0.0061833999999999995 },
    { start_date: '2020-01-24', end_date: '2020-02-21', num_days: 29, consumption: 10.8, footprint: 0.0077652 },
    { start_date: '2019-12-24', end_date: '2020-01-23', num_days: 31, consumption: 11.6, footprint: 0.0083404 },
    { start_date: '2019-11-22', end_date: '2019-12-23', num_days: 32, consumption: 13.4, footprint: 0.0096346 },
    { start_date: '2019-10-24', end_date: '2019-11-21', num_days: 29, consumption: 11.3, footprint: 0.0081247 },
    { start_date: '2019-09-20', end_date: '2019-10-23', num_days: 34, consumption: 10.9, footprint: 0.0078371 }],
    hydro: [{ start_date: '2020-01-01', num_days: 31, consumption: 936.0, footprint: 0.00998712 },
    { start_date: '2020-02-01', num_days: 29, consumption: 880.0, footprint: 0.0093896 },
    { start_date: '2020-03-01', num_days: 31, consumption: 1136.0, footprint: 0.01212112 }],
    commute: [{
      vehicle: 'Alfa Romeo Spider Veloce 2000', vehicle_year: 1985, transmission: 'Manual 5-spd',
      distance: 100.0, footprint: 0.0,
    },
    { vehicle: 'Alfa Romeo Spider Veloce 2000', vehicle_year: 1985, transmission: 'Manual 5-spd', distance: 100.0, footprint: 0.0 },
    { vehicle: 'Alfa Romeo Spider Veloce 2000', vehicle_year: 1985, transmission: 'Manual 5-spd', distance: 100.0, footprint: 0.0 }],
  }

  ngOnInit(): void {
    this.totalChartData = [
      { data: [this.total_footprint_user(), 0.09], label: 'Total Footprint in Metric tonnes ' },
    ]
    // allFortisValues = this.fortis_values().concat
    this.fortisChartData = [
      { data: this.fortis_values(), label: 'Monthly Footprint in metric tonnes' },
    ]

    this.hydroChartData = [
      { data: this.hydro_values(), label: 'Monthly Footprint in metric tonnes' },

    ]
    this.vehicleChartData = [
      { data: [this.total_footprint_commute() , 0.10] , label: 'Commute Footprint'},
    ]
  }

  total_footprint_fortis() {
    const totalFoot = this.userdata.fortis.reduce((sum, current) => sum + current.footprint, 0)
    console.log('This is fortis total footprint', totalFoot)
    return totalFoot
  }

  total_footprint_hydro() {
    const totalFoot = this.userdata.hydro.reduce((sum, current) => sum + current.footprint, 0)
    console.log('This is hydro total footprint', totalFoot)
    return totalFoot
  }

  total_footprint_commute() {

    const totalFoot = this.userdata.commute.reduce((sum, current) => sum + current.footprint, 0)
    console.log('This is total commute footprint', totalFoot)
    return totalFoot
  }

  total_footprint_user() {
    const hydroFootprint: number = this.total_footprint_hydro()
    const fortisFootprint: number = this.total_footprint_fortis()
    const commuteFootprint: number = this.total_footprint_commute()
    const totalFoot = hydroFootprint + fortisFootprint + commuteFootprint
    console.log('Total user footprint' + totalFoot)
    return totalFoot
  }

  fortis_values() {
    const allValues = []

    for (const dataEntry of this.userdata.fortis) {
      allValues.push(dataEntry.footprint)
    }

    console.log(allValues)
    console.log(typeof (allValues))
    // console.log(typeof(all_values))
    return allValues
  }
  hydro_values(){
    const allValues = []
    for (const dataEntry of this.userdata.hydro){
      allValues.push(dataEntry.footprint)
    }
    return allValues
  }


}
