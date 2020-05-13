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
  // A reference to the mat table that is a child of this component
  @ViewChild(MatTable) table: MatTable</* FortisRow */ any>

  // This is referenced in the html and used to define what columns should be displayed.
  readonly displayedColumns: string[] = ['startDate', 'endDate', 'numDays', 'consumption', 'avgTemp', 'delete']

  // An object that is essentially a list that holds the data that will be displayed in the table rows
  dataSource = new MatTableDataSource</* FortisRow */ any>()

  private bill: File

  constructor(private snackBar: MatSnackBar, private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  onUploadClicked(fileList) {
    // TODO: Handle this case more gracefully, the upload button shouldn't be available when there is no file to be uploaded
    if (!fileList || !fileList[0]){
      console.error('A file could not be found, was it already uploaded?')
      return
    }

    if (!this.validateFile(fileList[0].name)) {
      this.snackBar.open('Unsupported File Type!', 'Undo', {duration: 3000})
      return
    }

    this.bill = fileList[0]

    // make a request to back end to upload the file
    this.fileUploadService.uploadFortisBill(fileList[0]).then(response => {
        const jsonResponse: Array<JSON> = (response as Array<JSON>)
        console.log('backend returned: ' + JSON.stringify(jsonResponse))
        console.log(jsonResponse)
        for (const row of jsonResponse) {
          this.addRow(row, this.table, this.dataSource)
        }
    })
  }

  // TODO: store this function elsewhere and reference it (duplicated in hydro component)
  validateFile(filename: string): boolean {
    const extension = filename.substring(filename.lastIndexOf('.') + 1)
    return (extension.toLowerCase() === 'csv' ? true : false)
  }

  // TODO: Reuse code
  addRow(row: any, table: MatTable<any>, dataSource: MatTableDataSource<any>): void {
    dataSource.data.push(row)
    this.renderTable(table)
  }

  // TODO: Reuse code
  deleteRow(row: number, table: MatTable<any>, dataSource: MatTableDataSource<any>): void {
    // TODO: Delete the row from the backed DB
    dataSource.data.splice(row, 1) // deletes the row
    this.renderTable(table)
  }

  // TODO: Reuse code
  private renderTable(table: MatTable<any>): void {
    if (table) { // table can be null when it isn't displayed because of *ngIf
      table.renderRows() // The table doesn't re render unless we tell it to. How very non-angular.
    }
  }

}
