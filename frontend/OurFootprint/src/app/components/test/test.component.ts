import { Component, OnInit } from '@angular/core'
import { HttpTestService } from 'src/app/services/http-test.service'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  output = 'Nothing... the server is not running or is not connected'

  constructor(private httpTestService: HttpTestService) { }

  ngOnInit(): void {
    this.testGetRequest()
  }

  testGetRequest() {
    this.httpTestService.testGetRequest().subscribe(temp => {
      this.output = temp.message // response is json with a 'message' attribute
    })
  }

}
