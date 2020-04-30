import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class HttpTestService {

  constructor(private http: HttpClient) { }

  testGetRequest(): Observable<any> {
    return this.http.get('/api/endpoint1')
  }

  testPostRequest(): Observable<any> {
    return this.http.post('/api/endpoint1', 'Hello from Angular, Django!')
  }
}
