import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { LoginService } from 'src/app/services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  })

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login() {
    const formValues = this.form.value
    this.loginService.login({
      username: formValues.username,
      password: formValues.password,
    }).toPromise()
  }
}
