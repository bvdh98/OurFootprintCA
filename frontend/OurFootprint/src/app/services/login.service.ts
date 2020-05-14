import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(credentials: {username: string, password: string}): Observable<any> {
    return this.http.post('/api/login', credentials)
  }

  signUp(credentials: {username: string, password: string}): Observable<any> {
    return this.http.post('/api/signup', credentials)
  }

}
