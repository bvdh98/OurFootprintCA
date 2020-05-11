import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FileUploadService } from 'src/app/services/file-upload.service'

@Component({
  selector: 'app-hydro',
  templateUrl: './hydro.component.html',
  styleUrls: ['./hydro.component.scss'],
})
export class HydroComponent implements OnInit {

  private hydroBill: File

  constructor(private snackBar: MatSnackBar, private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  onUploadClickedHydro(fileList) {
    if (!this.validateFile(fileList[0].name)) {
      this.snackBar.open('Unsupported File Type!', 'Undo', {duration: 3000})
      return
    }
    // make a request to back end to upload the file
    this.fileUploadService.uploadHydroBill(fileList[0])
      .then(response =>
        console.log('backend returned: ' + (response as {example: string}).example))
  }

  // TODO: store this function elsewhere and reference it (duplicated in fortis component)
  validateFile(filename: string): boolean {
    const extension = filename.substring(filename.lastIndexOf('.') + 1)
    return (extension.toLowerCase() === 'csv' ? true : false)
  }

}
