import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss'],
})
export class UtilitiesComponent implements OnInit {

  filename: String = null

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

    return({
      name: fileList[0].name,
    })
  }

}
