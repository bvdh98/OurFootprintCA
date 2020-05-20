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
    return this.http.post('/api/user/login/', fd, {observe: 'response'})
  }

  signUp(credentials: {username: string, password: string, email: string}): Observable<any> {
    const fd = new FormData()
    fd.append('username', credentials.username)
    fd.append('password', credentials.password)
    fd.append('email' , credentials.email)
    return this.http.post('/api/user/signup/', fd, {observe: 'response'})
  }
}
