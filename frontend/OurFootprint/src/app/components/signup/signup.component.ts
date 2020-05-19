import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
  })

  constructor() { }

  // ngOnInit(): void {
  // }

  // signUp() {
  //   const formValues = this.form.value
  //   this.loginService.signUp({
  //     username: formValues.username,
  //     password: formValues.password,
  //   }).toPromise()
  // }

}
