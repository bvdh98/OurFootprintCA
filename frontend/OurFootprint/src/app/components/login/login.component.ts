import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { LoginService } from 'src/app/services/login.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginInvalid = false

  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  })

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    const formValues = this.form.value
    this.loginService.login({
      username: formValues.username,
      password: formValues.password,
    }, this.succeedLogin, this.failLogin)
  }

  succeedLogin(response) {
    this.loginService.changeLoggedInStatus(true)
    this.router.navigate([''])
  }

  failLogin(response) {
    this.loginInvalid = true
    this.form.controls.password.reset()
  }
}
