import { Component, OnInit, ViewChild } from '@angular/core'
import { ChartOptions, ChartDataSets } from 'chart.js'
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend, BaseChartDirective } from 'ng2-charts'
import { CalculateService } from 'src/app/services/calculate.service'

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
})
export class DashBoardComponent implements OnInit {
  @ViewChild("totalChart") totalChart: BaseChartDirective;
  @ViewChild("fortisChart") fortisChart: BaseChartDirective;
  @ViewChild("hydroChart") hydroChart: BaseChartDirective;
  @ViewChild("compFortisChart") compFortisChart: BaseChartDirective;
  @ViewChild("compHydroChart") compHydroChart: BaseChartDirective;
  @ViewChild("vehicleChart") vehicleChart: BaseChartDirective;

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
  hydroChartOptions: ChartOptions = {
    responsive: true,
    title: {text: 'Monthly electricity Footprint (metric tonnes)', display: true},
  }
  compFortisChartOptions: ChartOptions = {
    responsive: true,
    title: {text: 'Annual natural gas Footprint (metric tonnes)', display: true},
    scales: {yAxes: [{ticks: {min: 0, max: 8}}]},
  }
  compHydroChartOptions: ChartOptions = {
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
  compFortisChartLabels: Label[] = ['Your carbon emmission', 'Average carbon emmission']
  compHydroChartLabels: Label[] = ['Your carbon emmission', 'Average carbon emmission']

  pieChartData: SingleDataSet = []
  totalChartData: ChartDataSets[] = DashBoardComponent.initialDataState
  fortisChartData: ChartDataSets[] = DashBoardComponent.initialDataState
  hydroChartData: ChartDataSets[] = DashBoardComponent.initialDataState
  vehicleChartData: ChartDataSets[] = DashBoardComponent.initialDataState
  compFortisChartData: ChartDataSets[] = DashBoardComponent.initialDataState
  compHydroChartData: ChartDataSets[] = DashBoardComponent.initialDataState

  totalChartColors: any[]
  fortisChartColors: any[]
  hydroChartColors: any[]
  vehicleChartColors: any[]
  compFortisChartColors: any[]
  compHydroChartColors: any[]

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
  readonly averageYearlyHydroEmmisions = Math.round(900 * 0.010670 * 12) / 1000
  // TODO: Research the exact annual average Fortis consumption
  readonly averageYearlyFortisEmmisions = Math.round(8 * 49.87 * 12) / 1000
  // TODO: Research the exact annual average commute emmissions
  readonly averageYearlyCommuteEmmisions = 4.60
  readonly averageYearlyTotal = this.averageYearlyCommuteEmmisions + this.averageYearlyFortisEmmisions + this.averageYearlyHydroEmmisions

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

      this.totalChartOptions.scales.yAxes[0].ticks.max = this.getChartHeight(this.totalFootprint, this.averageYearlyTotal)
      this.updateChart(this.totalChart)

      this.compFortisChartOptions.scales.yAxes[0].ticks.max = this.getChartHeight(this.fortisFootprint, this.averageYearlyFortisEmmisions)
      this.updateChart(this.compFortisChart)

      this.compHydroChartOptions.scales.yAxes[0].ticks.max = this.getChartHeight(this.hydroFootprint, this.averageYearlyHydroEmmisions)
      this.updateChart(this.compHydroChart)

      this.vehicleChartOptions.scales.yAxes[0].ticks.max = this.getChartHeight(this.commuteFootprint, this.averageYearlyCommuteEmmisions)
      this.updateChart(this.vehicleChart)



      // TODO: Find some way to randomize / automate filling color list
      this.totalChartColors = [{ backgroundColor: '#FF7360' }]
      this.fortisChartColors = [{ backgroundColor: this.getRandomColor() }]
      this.compFortisChartColors = [{ backgroundColor: this.getRandomColor() }]
      this.hydroChartColors = [{ backgroundColor: this.getRandomColor() }]
      this.vehicleChartColors = [{ backgroundColor: this.getRandomColor() }]
      this.compHydroChartColors = [{ backgroundColor: this.getRandomColor() }]

      this.transportationPercentage = (this.total_footprint_commute() / this.total_footprint_user()) * 100
      this.fortisPercentage = (this.total_footprint_fortis() / this.total_footprint_user()) * 100
      this.hydroPercentage = 100 - this.transportationPercentage - this.fortisPercentage

      this.fortisChartLabels = this.fortis_labels()
      this.hydroChartLabels = this.hydro_labels()

      this.pieChartData = [this.transportationPercentage , this.fortisPercentage , this.hydroPercentage]
      this.totalChartData = [{ data: [this.total_footprint_user(), this.averageYearlyTotal], label: 'Total Footprint in Metric tonnes ' }]
      this.fortisChartData = [{ data: this.fortis_values(), label: 'Monthly Footprint in metric tonnes' }]
      this.hydroChartData = [{ data: this.hydro_values(), label: 'Monthly Footprint in metric tonnes' }]
      this.vehicleChartData = [{ data: [this.total_footprint_commute(), this.averageYearlyCommuteEmmisions], label: 'Commute Footprint' }]
      this.compFortisChartData = [
        { data: [this.total_footprint_fortis(), this.averageYearlyFortisEmmisions], label: 'annual fortis emmision' },
      ]
      this.compHydroChartData = [
        { data: [this.total_footprint_hydro(), this.averageYearlyHydroEmmisions], label: 'annual hydro emmision' },
      ]

    })
  }

  updateChart(chart: BaseChartDirective) {
    if(chart !== undefined){
      chart.ngOnDestroy();
      chart.chart = chart.getChartBuilder(chart.ctx);
    }
  }

  getChartHeight(...values) {
    return this.ceilToOOM(Math.max(...values) * 1.1) // 1.1 to add some paddin
  }

  ceilToOOM(value) {
    // numbers like 11 should not round up to 20, but 61 should round up to 70
    const precision = -(Math.round(Math.log(value) / Math.log(10)) - 1)
    return this.ceil(value, precision)
  }

  ceil(value, precision = 0) {
    const multiplier = Math.pow(10, precision)
    return Math.ceil(value * multiplier) / multiplier
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
