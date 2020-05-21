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

  login(credentials: {username: string, password: string}, successCallback = null, errorCallback = null): void {
    const fd = new FormData()
    fd.append('username', credentials.username)
    fd.append('password', credentials.password)
    this.http.post('/api/user/login/', fd, {observe: 'response'}).toPromise()
    .then(response => {
      // promise fulfilled
      if (response && response.status === 200) {
        successCallback(response)

      } else {
        // promise fulfilled, but status was not 200
        errorCallback(response)
      }
    }, reason => {
      // promise rejected
      errorCallback(reason.error)
    })
  }

  signUp(credentials: {username: string, password: string, email: string}, successCallback, errorCallback): void {
    const fd = new FormData()
    fd.append('username', credentials.username)
    fd.append('password', credentials.password)
    fd.append('email' , credentials.email)

    this.http.post('/api/user/signup/', fd, {observe: 'response'}).toPromise()
    .then(response => {
      // promise fulfilled
      if (response && response.status === 200) {
        successCallback(response.body)
      } else {
        // promise fulfilled, but status was not 200
        errorCallback(response.body)
      }
    }, reason => {
      // promise rejected
      errorCallback(reason.error)
    })
  }

  updateCurrentLoggedInStatus(): void {
    this.http.get<{is_logged_in: boolean}>('/api/user/check_login/').toPromise()
    .then((response) => {
      this.changeLoggedInStatus(response.is_logged_in)
    })
  }

  logOut(): void {
    this.changeLoggedInStatus(false)
    this.http.post('/api/user/logout/', null)
    // make sure the request is executed by converting it to a promise
    .toPromise()
  }
}
