import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss'],
})
export class UtilitiesComponent implements OnInit {

  private fileFortis: File
  private fileHydro: File

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onUploadClickedFortis(fileList) {

    if (!this.validateFile(fileList[0].name)) {
      this.snackBar.open('Unsupported File Type!', 'Undo', {
        duration: 3000,
      })
    } else {
      this.fileFortis = fileList[0]
    }

  }

  onUploadClickedHydro(fileList) {

    if (!this.validateFile(fileList[0].name)) {
      this.snackBar.open('Unsupported File Type!', 'Undo', {
        duration: 3000,
      })
    } else {
      this.fileHydro = fileList[0]
    }

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

}
