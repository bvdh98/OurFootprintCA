import { Component, OnInit } from '@angular/core'
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js'
import { Color, Label } from 'ng2-charts'

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
})
export class DashBoardComponent implements OnInit {
  // (Chart #1) bar chart to compare users' total annual footprint to the provincial average
  totalChartOptions: ChartOptions = {
    responsive: true,
    title: {
      text: 'Total Footprint (metric tonnes)',
      display: true,
    },
  }
  totalChartLabels: Label[] = ['Your Total Annual Footprint', 'Annual average footprint for BC']
  totalChartType: ChartType = 'bar'
  totalChartLegend = false
  totalChartPlugins = []
  totalChartData: ChartDataSets[]
  totalChartColors: any[]

  // (Chart #2) bar chart to compare month to month carbon footprint based on fortis consumption bills
  fortisChartOptions: ChartOptions = {
    responsive: true,
    title: {
      text: 'Monthly natural gas Footprint (metric tonnes)',
      display: true,
    },
  }
  fortisChartLabels: Label[]
  fortisChartData: ChartDataSets[]
  fortisChartType: ChartType = 'bar'
  fortisChartPlugins = []
  fortisChartLegend = false
  fortisChartColors: any[]

  // (Chart #3) bar chart to compare month to month carbon footprint based on BC Hydro consumption bills
  hydroChartOptions: ChartOptions = {
    responsive: true,
    title: {
      text: 'Monthly electricity Footprint (metric tonnes)',
      display: true,
    },
  }
  hydroChartLabels: Label[]
  hydroChartType: ChartType = 'bar'
  hydroChartLegend = false
  hydroChartPlugins = []
  hydroChartData: ChartDataSets[]
  hydroChartColors: any[]

  // (Chart #4) bar chart to compare users' carbon emissions from transportation to the US average
  vehicleChartOptions: ChartOptions = {
    responsive: true,
    title: {
      text: 'Total transportation Footprint (metric tonnes)',
      display: true,
    },
  }
  vehicleChartLabels: Label[] = ['Total Commute Footprint monthly', 'Average user monthly  Footprint']
  vehicleChartType: ChartType = 'bar'
  vehicleChartLegend = false
  vehicleChartPlugins = []
  vehicleChartData: ChartDataSets[]
  vehicleChartColors: any[]

  // (Chart #5) bar chart to compare users' carbon emissions from Fortis bills to the BC average
  compfortisChartOptions: ChartOptions = {
    responsive: true,
    title: {
      text: 'Annual natural gas Footprint (metric tonnes)',
      display: true,
    },
  }
  compfortisChartLabels: Label[] = ['Your carbon emmission', 'Average carbon emmission']
  compfortisChartType: ChartType = 'bar'
  compfortisChartLegend = false
  compfortisChartPlugins = []
  compfortisChartData: ChartDataSets[]
  compfortisChartColors: any[]

  // (Chart #6) bar chart to compare users' carbon emissions from BC Hydro bills to the BC average
  comphydroChartOptions: ChartOptions = {
    responsive: true,
    title: {
      text: 'Annual electricity Footprint (metric tonnes)',
      display: true,
    },
  }
  comphydroChartLabels: Label[] = ['Your carbon emmission', 'Average carbon emmission']
  comphydroChartType: ChartType = 'bar'
  comphydroChartLegend = false
  comphydroChartPlugins = []
  comphydroChartData: ChartDataSets[]
  comphydroChartColors: any[]

  totalFootprint: number
  commuteFootprint: number
  fortisFootprint: number
  hydroFootprint: number
  totalTrees: number
  dollars: number

  // TODO: Research the exact annual average BC Hydro consumption
  readonly averageYearlyHydroemmision = Math.round(900 * 0.010670 * 12) / 1000
  // TODO: Research the exact annual average Fortis consumption
  readonly averageYearlyFortisemmision = Math.round(8 * 0.719 * 12) / 1000
  // TODO: Research the exact annual average commute emmissions
  readonly averageYearlyCommuteemmision = 4.60
  readonly totalYearly = this.averageYearlyCommuteemmision + this.averageYearlyFortisemmision + this.averageYearlyHydroemmision

  // TODO: Remove hardcoded data
  readonly userdata = {
    fortis: [{ start_date: '2020-03-24', end_date: '2020-04-21', num_days: 29, consumption: 5.4, footprint: 0.0038826 , month: 'April' },
    { start_date: '2020-02-22', end_date: '2020-03-23', num_days: 31, consumption: 8.6, footprint: 0.0061833999999999995 , month: 'march'},
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
      { data: [this.total_footprint_user(), this.totalYearly], label: 'Total Footprint in Metric tonnes ' },
    ]
    // TODO: Find some way to randomize/ automate filling color list
    this.totalChartColors = [{ backgroundColor:"#FF7360" }]

    this.fortisChartData = [
      { data: this.fortis_values(), label: 'Monthly Footprint in metric tonnes' },
    ]

    this.fortisChartLabels = this.fortis_labels()
    this.fortisChartColors = [{ backgroundColor: this.getRandomColor() }]
    this.hydroChartLabels = this.hydro_labels()

    this.hydroChartData = [
      { data: this.hydro_values(), label: 'Monthly Footprint in metric tonnes' },
    ]
    this.hydroChartColors = [{ backgroundColor: this.getRandomColor() }]

    this.vehicleChartData = [
      { data: [this.total_footprint_commute() , this.averageYearlyCommuteemmision] , label: 'Commute Footprint'},
    ]
    this.vehicleChartColors = [{ backgroundColor: this.getRandomColor() }]

    this.compfortisChartData = [
      { data: [this.total_footprint_fortis() , this.averageYearlyFortisemmision] , label: 'annual fortis emmision'},
    ]
    this.compfortisChartColors = [{ backgroundColor: this.getRandomColor() }]

    this.comphydroChartData = [
      { data: [this.total_footprint_hydro() , this.averageYearlyHydroemmision] , label: 'annual hydro emmision'},
    ]
    this.comphydroChartColors = [{ backgroundColor: this.getRandomColor() }]

    this.totalFootprint = this.total_footprint_user()
    this.commuteFootprint = this.total_footprint_commute()
    this.fortisFootprint = this.total_footprint_fortis()
    this.hydroFootprint = this.total_footprint_hydro()
    this.totalTrees = this.footprint_to_tree()
    this.dollars = this.tree_to_dollars()

  }

  getRandomColorsList(len) {
    const colors: string[] = []
    let i: number
    for (i = 0; i < len; i++) {
        colors.push(this.getRandomColor())
    }
    return colors
  }

  getRandomColor() {
    length = 6
    const chars = '0123456789ABCDEF'
    let hex = '#'
    while (length--) {
      console.log(Math.random() * 16)
      hex += chars[Math.trunc(Math.random() * 16)]
    }
    return hex
  }

  total_footprint_fortis() {
    const totalFoot = this.userdata.fortis.reduce((sum, current) => sum + current.footprint, 0)

    return Math.round(totalFoot * 100) / 100
  }

  total_footprint_hydro() {

    const totalFoot = this.userdata.hydro.reduce((sum, current) => sum + current.footprint, 0)

    return Math.round(totalFoot * 100) / 100
  }

  total_footprint_commute() {

    const totalFoot = this.userdata.commute.reduce((sum, current) => sum + current.footprint, 0)

    return Math.round(totalFoot * 100 * 12) / 100
  }

  total_footprint_user() {
    const hydroFootprint: number = this.total_footprint_hydro()
    const fortisFootprint: number = this.total_footprint_fortis()
    const commuteFootprint: number = this.total_footprint_commute()
    const totalFoot = hydroFootprint + fortisFootprint + commuteFootprint
    // TODO find a better way to round off for all MATH.round
    return Math.round(totalFoot * 100) / 100
  }

  fortis_values() {
    const allValues = []

    for (const dataEntry of this.userdata.fortis) {
      allValues.push(dataEntry.footprint)
    }

    return allValues
  }
  // returns all the hydro footprint values as an array
  hydro_values(){
    const allValues = []
    for (const dataEntry of this.userdata.hydro){
      allValues.push(dataEntry.footprint)
    }
    return allValues
  }
// gives no of trees to offset the carbon emmission based on the total footprint
  footprint_to_tree(){
    const footprint = this.total_footprint_user()
    const tonnesCo2ToTreeRatio = 0.0217724
    return Math.ceil(footprint / tonnesCo2ToTreeRatio)
  }
// returns the dollars to plant no of trees on the basis of total footprint
  tree_to_dollars(){
    const noOfTrees = this.footprint_to_tree()
    const costOfOneTree = 4
    return noOfTrees * costOfOneTree
  }
  // returns the array of month based on  fortis object
  fortis_labels(){
    const allValues = []
    for (const dataEntry of this.userdata.fortis){
      allValues.push(dataEntry.month)
    }
    return allValues
  }
  // returns the array of months based on hydro object
  hydro_labels(){
    const allValues = []
    for (const dataEntry of this.userdata.hydro){
      allValues.push(dataEntry.month)
    }
    return allValues
  }
}
