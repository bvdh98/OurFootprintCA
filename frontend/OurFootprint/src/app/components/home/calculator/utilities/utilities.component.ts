import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss'],
})
export class UtilitiesComponent implements OnInit {

  filename: string = "null"

  @Output() messageEvent = new EventEmitter<string>()
  message: string = "testing"

  constructor() { }

  ngOnInit(): void {
  }

  onUploadClicked(fileList) {
    console.log('test')
    console.log(fileList)
    console.log(fileList[0])
    console.log(fileList[0].type)
    console.log(fileList[0].name)
    this.filename = fileList[0].name
    console.log(this.filename)

    this.messageEvent.emit(this.message)

    /** 
    return({
      name: fileList[0].name,
    })
    */
  }

}
