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

  readonly displayedColumns: string[] = ['testColumn1', 'testColumn2']
  dataSource = new MatTableDataSource</* FortisRow */ any>()

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
        console.log('backend returned: ' + JSON.stringify(response)))
  }

  // TODO: store this function elsewhere and reference it (duplicated in fortis component)
  validateFile(filename: string): boolean {
    const extension = filename.substring(filename.lastIndexOf('.') + 1)
    return (extension.toLowerCase() === 'csv' ? true : false)
  }

   // TODO: Reuse code
   deleteHydroRow(row: number): void {
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
