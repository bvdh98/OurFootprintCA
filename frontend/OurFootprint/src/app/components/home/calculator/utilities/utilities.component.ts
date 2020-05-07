import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss'],
})
export class UtilitiesComponent implements OnInit {

  filenameFortis: string = null
  filenameHydro: string = null

  constructor() { }

  ngOnInit(): void {
  }

  onUploadClickedFortis(fileList) {
    console.log('Fortis BC Test')
    console.log(fileList)
    console.log(fileList[0])
    console.log(fileList[0].type)
    console.log(fileList[0].name)
    this.filenameFortis = fileList[0].name
    console.log(this.filenameFortis)
  }

  onUploadClickedHydro(fileList) {
    console.log('BC Hydro Test')
    console.log(fileList)
    console.log(fileList[0])
    console.log(fileList[0].type)
    console.log(fileList[0].name)
    this.filenameHydro = fileList[0].name
    console.log(this.filenameHydro)
  }

}
