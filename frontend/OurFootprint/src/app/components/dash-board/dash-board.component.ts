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

  fortisChartLabels: Label[]
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
  hydroChartLabels: Label[] 
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
  totalFootprint: number
  commuteFootprint: number
  fortisFootprint: number
  hydroFootprint: number
  totalTrees: number
  dollars: number



  // TODO: Remove hardcoded data
  readonly userdata = {
    fortis: [{ start_date: '2020-03-24', end_date: '2020-04-21', num_days: 29, consumption: 5.4, footprint: 0.0038826 , month: 'April' },
    { start_date: '2020-02-22', end_date: '2020-03-23', num_days: 31, consumption: 8.6, footprint: 0.0061833999999999995 , month: 'march' },
    { start_date: '2020-01-24', end_date: '2020-02-21', num_days: 29, consumption: 10.8, footprint: 0.0077652 , month: 'February' },
    { start_date: '2019-12-24', end_date: '2020-01-23', num_days: 31, consumption: 11.6, footprint: 0.0083404 , month: 'January' },
    { start_date: '2019-11-22', end_date: '2019-12-23', num_days: 32, consumption: 13.4, footprint: 0.0096346 , month: 'December' },
    { start_date: '2019-10-24', end_date: '2019-11-21', num_days: 29, consumption: 11.3, footprint: 0.0081247 , month: 'November' },
    { start_date: '2019-09-20', end_date: '2019-10-23', num_days: 34, consumption: 10.9, footprint: 0.0078371 , month: 'October' }],
    hydro: [{ start_date: '2020-01-01', num_days: 31, consumption: 936.0, footprint: 0.00998712 , month: 'January' },
    { start_date: '2020-02-01', num_days: 29, consumption: 880.0, footprint: 0.0093896 , month: 'February' },
    { start_date: '2020-03-01', num_days: 31, consumption: 1136.0, footprint: 0.01212112 , month: 'March' }],
    commute: [{
      vehicle: 'Alfa Romeo Spider Veloce 2000', vehicle_year: 1985, transmission: 'Manual 5-spd',
      distance: 100.0, footprint: 0.0,
    },
    { vehicle: 'Alfa Romeo Spider Veloce 2000', vehicle_year: 1985, transmission: 'Manual 5-spd', distance: 100.0, footprint: 0.0 },
    { vehicle: 'Alfa Romeo Spider Veloce 2000', vehicle_year: 1985, transmission: 'Manual 5-spd', distance: 100.0, footprint: 0.0 }],
  }
  constructor() { }

  ngOnInit(): void {
    this.totalChartData = [
      { data: [this.total_footprint_user(), 0.09], label: 'Total Footprint in Metric tonnes ' },
    ]
    // allFortisValues = this.fortis_values().concat
    this.fortisChartData = [
      { data: this.fortis_values(), label: 'Monthly Footprint in metric tonnes' },
    ]

    this.fortisChartLabels = this.fortis_labels()
    this.hydroChartLabels = this.hydro_labels()

    this.hydroChartData = [
      { data: this.hydro_values(), label: 'Monthly Footprint in metric tonnes' },

    ]
    this.vehicleChartData = [
      { data: [this.total_footprint_commute() , 0.10] , label: 'Commute Footprint'},
    ]
    this.totalFootprint = this.total_footprint_user()
    this.commuteFootprint = this.total_footprint_commute()
    this.fortisFootprint = this.total_footprint_fortis()
    this.hydroFootprint = this.total_footprint_hydro()
    this.totalTrees = this.footprint_to_tree()
    this.dollars = this.tree_to_dollars()
    console.log('Dollars' , this.tree_to_dollars())
    console.log('Trees' , this.footprint_to_tree())
    console.log(this.totalFootprint)
  }

  total_footprint_fortis() {
    const totalFoot = this.userdata.fortis.reduce((sum, current) => sum + current.footprint, 0)
    console.log('This is fortis total footprint', totalFoot)
    return Math.round(totalFoot * 100) / 100
  }

  total_footprint_hydro() {
    console.log(this.userdata)
    const totalFoot = this.userdata.hydro.reduce((sum, current) => sum + current.footprint, 0)
    console.log('This is hydro total footprint', totalFoot)
    return Math.round(totalFoot * 100) / 100
  }

  total_footprint_commute() {

    const totalFoot = this.userdata.commute.reduce((sum, current) => sum + current.footprint, 0)
    console.log('This is total commute footprint', totalFoot)
    return Math.round(totalFoot * 100) / 100
  }

  total_footprint_user() {
    const hydroFootprint: number = this.total_footprint_hydro()
    const fortisFootprint: number = this.total_footprint_fortis()
    const commuteFootprint: number = this.total_footprint_commute()
    const totalFoot = hydroFootprint + fortisFootprint + commuteFootprint
    console.log('Total user footprint' + totalFoot)
    return Math.round(totalFoot * 100) / 100
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

  footprint_to_tree(){
    const footprint = this.total_footprint_user()
    const tonnesCo2ToTreeRatio = 0.0217724
    return Math.ceil(footprint / tonnesCo2ToTreeRatio)
  }

  tree_to_dollars(){
    const noOfTrees = this.footprint_to_tree()
    const costOfOneTree = 4
    return noOfTrees * costOfOneTree
  }
  fortis_labels(){
    const allValues = []
    for (const dataEntry of this.userdata.fortis){
      allValues.push(dataEntry.month)
    }
    return allValues
  }
  hydro_labels(){
    const allValues = []
    for (const dataEntry of this.userdata.hydro){
      allValues.push(dataEntry.month)
    }
    return allValues
  }


}
