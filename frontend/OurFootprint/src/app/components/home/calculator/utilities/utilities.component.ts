import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss'],
})
export class UtilitiesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onUploadClicked(fileList) {
    console.log('test')
    console.log(fileList)
    console.log(fileList[0])
    console.log(fileList[0].type)
  }

}
