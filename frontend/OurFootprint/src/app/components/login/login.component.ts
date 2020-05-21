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
    }, this, this.succeedLogin, this.failLogin)
  }

  succeedLogin(component, response) {
    component.loginService.changeLoggedInStatus(true)
    component.router.navigate([''])
  }

  failLogin(component, response) {
    component.loginInvalid = true
    component.form.controls.password.reset()
  }
}
