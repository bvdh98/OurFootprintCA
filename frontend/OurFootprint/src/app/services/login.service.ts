import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private loggedInSource = new BehaviorSubject<boolean>(false)
  currentLoggedInStatus = this.loggedInSource.asObservable()

  constructor(private http: HttpClient) { }

  changeLoggedInStatus(status: boolean) {
    this.loggedInSource.next(status)
  }

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

  isLogged(): Observable<any> {
    return this.http.get('/api/user/check_login/')
  }

  logOut(): Observable<any> {
    return this.http.post('/api/user/logout/', null)
  }
}
