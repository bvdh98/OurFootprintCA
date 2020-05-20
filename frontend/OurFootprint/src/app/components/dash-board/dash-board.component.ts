import { Component, OnInit } from '@angular/core'
import { ChartOptions, ChartDataSets } from 'chart.js'
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts'
import { CalculateService } from 'src/app/services/calculate.service'

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
})
export class DashBoardComponent implements OnInit {
  // (Chart #1) bar chart to compare users' total annual footprint to the provincial average
  // (Chart #2) bar chart to compare month to month carbon footprint based on fortis consumption bills
  // (Chart #3) bar chart to compare month to month carbon footprint based on BC Hydro consumption bills
  // (Chart #4) bar chart to compare users' carbon emissions from transportation to the US average
  // (Chart #5) bar chart to compare users' carbon emissions from Fortis bills to the BC average
  // (Chart #6) bar chart to compare users' carbon emissions from BC Hydro bills to the BC average

  // an initial state for the datasets of the graphs so that ngCharts doesn't freak out before the ngOnInit logic fires
  static readonly initialDataState = [{ data: [] }]

  pieChartOptions: ChartOptions = {
    responsive: true,
    title: {text: 'Total Footprint Distribution (metric tonnes)', display: true},
  }
  totalChartOptions: ChartOptions = {
    responsive: true,
    title: {text: 'Total Footprint (metric tonnes)', display: true},
    scales: {yAxes: [{ ticks: {min: 0, max: 6} }]},
  }
  fortisChartOptions: ChartOptions = {
    responsive: true,
    title: {text: 'Monthly natural gas Footprint (metric tonnes)', display: true},
  }
  compfortisChartOptions: ChartOptions = {
    responsive: true,
    title: {text: 'Annual natural gas Footprint (metric tonnes)', display: true},
    scales: {yAxes: [{ticks: {min: 0, max: 0.3}}]},
  }
  hydroChartOptions: ChartOptions = {
    responsive: true,
    title: {text: 'Monthly electricity Footprint (metric tonnes)', display: true},
  }
  comphydroChartOptions: ChartOptions = {
    responsive: true,
    title: {text: 'Annual electricity Footprint (metric tonnes)', display: true},
    scales: {yAxes: [{ticks: {min: 0, max: 0.2}}]},
  }
  vehicleChartOptions: ChartOptions = {
    responsive: true,
    title: {text: 'Total transportation Footprint (metric tonnes)', display: true},
    scales: {yAxes: [{ticks: {min: 0, max: 5}}]},
  }

  pieChartLabels: Label[] = [['Transportation Emissions'], ['Fortis Emissions(Natural Gas)'], 'Hydro Emissions(Electricity)']
  totalChartLabels: Label[] = ['Your Total Annual Footprint', 'Annual average footprint for BC']
  fortisChartLabels: Label[]
  hydroChartLabels: Label[]
  vehicleChartLabels: Label[] = ['Total Commute Footprint annualy', 'Average user annual Footprint']
  compfortisChartLabels: Label[] = ['Your carbon emmission', 'Average carbon emmission']
  comphydroChartLabels: Label[] = ['Your carbon emmission', 'Average carbon emmission']

  pieChartData: SingleDataSet = []
  totalChartData: ChartDataSets[] = DashBoardComponent.initialDataState
  fortisChartData: ChartDataSets[] = DashBoardComponent.initialDataState
  hydroChartData: ChartDataSets[] = DashBoardComponent.initialDataState
  vehicleChartData: ChartDataSets[] = DashBoardComponent.initialDataState
  compfortisChartData: ChartDataSets[] = DashBoardComponent.initialDataState
  comphydroChartData: ChartDataSets[] = DashBoardComponent.initialDataState

  totalChartColors: any[]
  fortisChartColors: any[]
  hydroChartColors: any[]
  vehicleChartColors: any[]
  compfortisChartColors: any[]
  comphydroChartColors: any[]

  totalFootprint: number
  commuteFootprint: number
  fortisFootprint: number
  hydroFootprint: number
  totalTrees: number
  dollars: number
  transportationPercentage: number
  fortisPercentage: number
  hydroPercentage: number

  // TODO: Research the exact annual average BC Hydro consumption
  readonly averageYearlyHydroemmision = Math.round(900 * 0.010670 * 12) / 1000
  // TODO: Research the exact annual average Fortis consumption
  readonly averageYearlyFortisemmision = Math.round(8 * 49.87 * 12) / 1000
  // TODO: Research the exact annual average commute emmissions
  readonly averageYearlyCommuteemmision = 4.60
  readonly totalYearly = this.averageYearlyCommuteemmision + this.averageYearlyFortisemmision + this.averageYearlyHydroemmision

  // TODO: Remove hardcoded data
  userdata

  constructor(private calculateService: CalculateService) {
    monkeyPatchChartJsTooltip()
    monkeyPatchChartJsLegend()
  }

  ngOnInit(): void {
    this.calculateService.calculateFootprint().subscribe(response => {
      this.userdata = response

      this.totalFootprint = this.total_footprint_user()
      this.commuteFootprint = this.total_footprint_commute()
      this.fortisFootprint = this.total_footprint_fortis()
      this.hydroFootprint = this.total_footprint_hydro()
      this.totalTrees = this.footprint_to_tree()
      this.dollars = this.tree_to_dollars()

      // TODO: Find some way to randomize / automate filling color list
      this.totalChartColors = [{ backgroundColor: '#FF7360' }]
      this.fortisChartColors = [{ backgroundColor: this.getRandomColor() }]
      this.compfortisChartColors = [{ backgroundColor: this.getRandomColor() }]
      this.hydroChartColors = [{ backgroundColor: this.getRandomColor() }]
      this.vehicleChartColors = [{ backgroundColor: this.getRandomColor() }]
      this.comphydroChartColors = [{ backgroundColor: this.getRandomColor() }]

      this.transportationPercentage = (this.total_footprint_commute() / this.total_footprint_user()) * 100
      this.fortisPercentage = (this.total_footprint_fortis() / this.total_footprint_user()) * 100
      this.hydroPercentage = 100 - this.transportationPercentage - this.fortisPercentage

      this.fortisChartLabels = this.fortis_labels()
      this.hydroChartLabels = this.hydro_labels()

      this.pieChartData = [this.transportationPercentage , this.fortisPercentage , this.hydroPercentage]
      this.totalChartData = [{ data: [this.total_footprint_user(), this.totalYearly], label: 'Total Footprint in Metric tonnes ' }]
      this.fortisChartData = [{ data: this.fortis_values(), label: 'Monthly Footprint in metric tonnes' }]
      this.hydroChartData = [{ data: this.hydro_values(), label: 'Monthly Footprint in metric tonnes' }]
      this.vehicleChartData = [{ data: [this.total_footprint_commute(), this.averageYearlyCommuteemmision], label: 'Commute Footprint' }]
      this.compfortisChartData = [
        { data: [this.total_footprint_fortis(), this.averageYearlyFortisemmision], label: 'annual fortis emmision' },
      ]
      this.comphydroChartData = [
        { data: [this.total_footprint_hydro(), this.averageYearlyHydroemmision], label: 'annual hydro emmision' },
      ]

    })
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
    return this.userdata.fortis.map(dataEntry => dataEntry.footprint)
  }
  // returns all the hydro footprint values as an array
  hydro_values() {
    return this.userdata.hydro.map(dataEntry => dataEntry.footprint)
  }
  // gives no of trees to offset the carbon emmission based on the total footprint
  footprint_to_tree() {
    const footprint = this.total_footprint_user()
    const tonnesCo2ToTreeRatio = 0.0217724 // TODO: Hardcoded here?
    return Math.ceil(footprint / tonnesCo2ToTreeRatio)
  }
  // returns the dollars to plant no of trees on the basis of total footprint
  tree_to_dollars() {
    const noOfTrees = this.footprint_to_tree()
    const costOfOneTree = 4 // TODO: Hardcoded here?
    return noOfTrees * costOfOneTree
  }
  // returns the array of month based on  fortis object
  fortis_labels() {
    return this.userdata.fortis.map(dataEntry => dataEntry.month)
  }
  // returns the array of months based on hydro object
  hydro_labels() {
    return this.userdata.hydro.map(dataEntry => dataEntry.month)
  }
}
