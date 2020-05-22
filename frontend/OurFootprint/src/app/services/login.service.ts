import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'

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

  login(credentials: {username: string, password: string}, component, successCallback, errorCallback): void {
    const fd = new FormData()
    fd.append('username', credentials.username)
    fd.append('password', credentials.password)
    this.http.post('/api/user/login/', fd, {observe: 'response'}).toPromise()
    .then(response => {
      // promise fulfilled
      if (response && response.status === 200) {
        successCallback(component, response)
      } else {
        // promise fulfilled, but status was not 200
        console.log('error callback 1')
        errorCallback(component, response)
      }
    }, reason => {
      // promise rejected
      console.log('error callback 2')
      errorCallback(component, reason.error)
    })
  }

  signUp(credentials: {username: string, password: string, email: string}, component, successCallback, errorCallback): void {
    const fd = new FormData()
    fd.append('username', credentials.username)
    fd.append('password', credentials.password)
    fd.append('email' , credentials.email)

    this.http.post('/api/user/signup/', fd, {observe: 'response'}).toPromise()
    .then(response => {
      // promise fulfilled
      if (response && response.status === 200) {
        successCallback(component, response.body)
      } else {
        // promise fulfilled, but status was not 200
        errorCallback(component, response.body)
      }
    }, reason => {
      // promise rejected
      errorCallback(component, reason.error)
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
