import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss'],
})
export class UtilitiesComponent implements OnInit {

  private fileFortis: File
  private fileHydro: File
  fileExtensionError: string

  constructor() { }

  ngOnInit(): void {
  }

  onUploadClickedFortis(fileList) {
    this.resetFileExtensionError();
    (this.validateFile(fileList[0].name) ? this.fileFortis = fileList[0] : this.fileExtensionError = fileList[0].name + ' is an unsupported file')
  }

  onUploadClickedHydro(fileList) {
    this.resetFileExtensionError();
    (this.validateFile(fileList[0].name) ? this.fileHydro = fileList[0] : this.fileExtensionError = fileList[0].name + ' is an unsupported file extension')
  }

  getFortisFile(): File {
    return this.fileFortis
  }

  getHydroFile(): File {
    return this.fileHydro
  }

  validateFile(filename: string): boolean {
    const extension = filename.substring(filename.lastIndexOf('.') + 1)
    return (extension.toLowerCase() === 'csv' ? true : false)
  }

  resetFileExtensionError() {
    this.fileExtensionError = ''
  }

}
