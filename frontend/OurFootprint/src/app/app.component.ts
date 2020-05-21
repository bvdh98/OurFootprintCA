import { Component , OnInit } from '@angular/core'
import { LoginService } from './services/login.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'OurFootprint'

  isLoggedIn = false

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.updateCurrentLoggedInStatus()
    this.loginService.currentLoggedInStatus.subscribe(status => this.isLoggedIn = status)
  }

  logout(): void {
    this.loginService.logOut()
  }
}
