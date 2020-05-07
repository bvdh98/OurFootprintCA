import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss'],
})
export class UtilitiesComponent implements OnInit {

  private fileFortis: File
  private fileHydro: File

  constructor() { }

  ngOnInit(): void {
  }

  onUploadClickedFortis(fileList) {
    this.fileFortis = fileList[0]
  }

  onUploadClickedHydro(fileList) {
    this.fileHydro = fileList[0]
  }

  getFortisFile(): File {
    return this.fileFortis
  }

  getHydroFile(): File {
    return this.fileHydro
  }

}
