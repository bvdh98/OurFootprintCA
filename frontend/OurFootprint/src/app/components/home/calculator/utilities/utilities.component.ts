import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FileUploadService } from 'src/app/services/file-upload.service'

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss'],
})
export class UtilitiesComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  onUploadClickedFortis(fileList) {
    if (!this.validateFile(fileList[0].name)) {
      this.snackBar.open('Unsupported File Type!', 'Undo', {
        duration: 3000,
      })
    } else {
      // make a request to back end to upload the file
      this.fileUploadService.uploadFortisBill(fileList[0])
    }
  }

  onUploadClickedHydro(fileList) {
    if (!this.validateFile(fileList[0].name)) {
      this.snackBar.open('Unsupported File Type!', 'Undo', {duration: 3000})
      return
    }
    // make a request to back end to upload the file
    this.fileUploadService.uploadHydroBill(fileList[0])
  }

  validateFile(filename: string): boolean {
    const extension = filename.substring(filename.lastIndexOf('.') + 1)
    return (extension.toLowerCase() === 'csv' ? true : false)
  }

}
