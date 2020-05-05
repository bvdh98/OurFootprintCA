import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core'

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss'],
})
export class UtilitiesComponent implements OnInit {

  @Output() uploadClicked: EventEmitter<FileList> = new EventEmitter<FileList>()
  @ViewChild('fileInput', { static: false }) fileInputRef: ElementRef
  selectedFiles: FileList
  selectedFileText = ''

  constructor() { }

  ngOnInit(): void {
  }

  uploadFiles(): void {
    this.uploadClicked.emit(this.selectedFiles)
    this.resetFileInput()
  }

  resetFileInput(): void {
    this.fileInputRef.nativeElement.value = ''
  }

}
