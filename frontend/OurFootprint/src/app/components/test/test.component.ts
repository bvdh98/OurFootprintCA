import { Component, OnInit } from '@angular/core';
import { HttpTestService } from 'src/app/services/http-test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  output: String = "No output."

  constructor(private httpTestService: HttpTestService) { }

  ngOnInit(): void {
    this.grabFromEndpoint;
  }

  grabFromEndpoint() {
    this.httpTestService.testGetRequest().subscribe(temp => {
      this.output = temp; // assign the array to the items array
    });
  }

}
