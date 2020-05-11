import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FileUploadService } from 'src/app/services/file-upload.service'

@Component({
  selector: 'app-fortis',
  templateUrl: './fortis.component.html',
  styleUrls: ['./fortis.component.scss'],
})
export class FortisComponent implements OnInit {

  private fortisBill: File

  constructor(private snackBar: MatSnackBar, private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  onUploadClickedFortis(fileList) {
    if (!fileList || !fileList[0]){
      console.log('oopsies')
      return
    }

    console.log('found a file... neat!')

    if (!this.validateFile(fileList[0].name)) {
      this.snackBar.open('Unsupported File Type!', 'Undo', {
        duration: 3000,
      })
      return
    }

    console.log('the file had a valid extension!')

    this.fortisBill = fileList[0]
    // make a request to back end to upload the file
    this.fileUploadService.uploadFortisBill(fileList[0])
      .then(response =>
        console.log('backend returned: ' + (response as {example: string}).example))
  }

  // TODO: store this function elsewhere and reference it (duplicated in hydro component)
  validateFile(filename: string): boolean {
    const extension = filename.substring(filename.lastIndexOf('.') + 1)
    return (extension.toLowerCase() === 'csv' ? true : false)
  }

}
