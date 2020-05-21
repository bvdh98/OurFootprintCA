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
    this.loginService.currentLoggedInStatus.subscribe(status => this.isLoggedIn = status)
    this.loginService.isLogged().subscribe((response) => {
      this.isLoggedIn = response.is_logged_in
    })
  }

  logout(): void {
    this.loginService.logOut().subscribe(() => {
      this.loginService.changeLoggedInStatus(false)
      this.isLoggedIn = false
    })
  }
}
