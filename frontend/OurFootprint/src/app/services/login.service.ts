import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(credentials: {username: string, password: string}): Observable<any> {
    const fd = new FormData()
    fd.append('username', credentials.username)
    fd.append('password', credentials.password)
    return this.http.post('/api/login/', fd)
  }

  signUp(credentials: {username: string, password: string}): Observable<any> {
    const fd = new FormData()
    fd.append('username', credentials.username)
    fd.append('password', credentials.password)
    return this.http.post('/api/signup/', fd)
  }

}