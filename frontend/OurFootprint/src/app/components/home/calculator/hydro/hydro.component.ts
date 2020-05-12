import { Component, OnInit, ViewChild } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FileUploadService } from 'src/app/services/file-upload.service'
import { MatTableDataSource, MatTable } from '@angular/material/table'

@Component({
  selector: 'app-hydro',
  templateUrl: './hydro.component.html',
  styleUrls: ['./hydro.component.scss'],
})
export class HydroComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable</* HydroRow */ any>

  readonly displayedColumns: string[] = ['consumption', 'avgtemp']
  dataSource = new MatTableDataSource</* FortisRow */ any>()

  private bill: File

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
        console.log('backend returned: ' + JSON.stringify(response)))
  }

  onUploadClicked(fileList) {
    if (!fileList || !fileList[0]){
      console.log('oopsies')
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
  deleteRow(row: number, table: MatTable<any>): void {
    this.dataSource.data.splice(row, 1) // deletes the row
    this.renderTable(table)
  }

  // TODO: Reuse code
  private renderTable(table: MatTable<any>): void {
    if (table) { // table can be null when it isn't displayed because of *ngIf
      table.renderRows() // The table doesn't re render unless we tell it to. How very non-angular.
    }
  }

}
