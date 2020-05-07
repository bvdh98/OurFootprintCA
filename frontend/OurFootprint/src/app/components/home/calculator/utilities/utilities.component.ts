import { Component, OnInit } from '@angular/core'

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
    (this.validateFile(fileList[0].name) ? this.fileFortis = fileList[0] : console.log('Unsupported file extension'))
  }

  onUploadClickedHydro(fileList) {
    (this.validateFile(fileList[0].name) ? this.fileHydro = fileList[0] : console.log('Unsupported file extension'))
  }

  getFortisFile(): File {
    return this.fileFortis
  }

  getHydroFile(): File {
    return this.fileHydro
  }

  validateFile(filename: string): boolean {
    const extension = filename.substring(filename.lastIndexOf('.') + 1)
    // tslint:disable-next-line: triple-equals
    if (extension.toLowerCase() == 'cvs') {
        return true
    }
    else {
        return false
    }
  }

}
