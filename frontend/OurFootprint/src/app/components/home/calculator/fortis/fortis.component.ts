import { Component, OnInit, ViewChild } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FileUploadService } from 'src/app/services/file-upload.service'
import { MatTableDataSource, MatTable } from '@angular/material/table'

@Component({
  selector: 'app-fortis',
  templateUrl: './fortis.component.html',
  styleUrls: ['./fortis.component.scss'],
})
export class FortisComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable</* FortisRow */ any>

  readonly displayedColumns: string[] = ['startDate', 'endDate', 'numDays', 'consumption', 'avgTemmp']
  dataSource = new MatTableDataSource</* FortisRow */ any>()

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
        console.log('backend returned: ' + JSON.stringify(response)))
  }

  // TODO: store this function elsewhere and reference it (duplicated in hydro component)
  validateFile(filename: string): boolean {
    const extension = filename.substring(filename.lastIndexOf('.') + 1)
    return (extension.toLowerCase() === 'csv' ? true : false)
  }

  // TODO: Reuse code
  deleteFortisRow(row: number): void {
    this.dataSource.data.splice(row, 1) // deletes the row
    this.renderTable()
  }

  // TODO: Reuse code
  private renderTable() {
    if (this.table) { // table can be null when it isn't displayed because of *ngIf
      this.table.renderRows() // The table doesn't re render unless we tell it to. How very non-angular.
    }
  }

}
