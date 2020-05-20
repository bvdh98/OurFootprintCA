import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { LoginService } from 'src/app/services/login.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  constructor(private loginService: LoginService , private formBuilder: FormBuilder) { }

  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    confirmpassword: new FormControl(),
    email: new FormControl(),
  })
  errormessage = ''
  disabledBtn: boolean
  signupInvalid = false

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
      confirmpassword: '',
    })

    this.disabledBtn = true

    // Displays the error message if the passwords do not match
    this.form.get('confirmpassword').valueChanges.subscribe(val => {
      if (val === '') {
        this.disabledBtn = true
      }
      else if (val !== this.form.value.password) {
        this.errormessage = 'Passwords do not match'
        this.disabledBtn = true
      }
      else {
        this.errormessage = ''
        this.disabledBtn = false
      }
    })
  }

  signUp() {
    const formValues = this.form.value
    this.loginService.signUp({
      username: formValues.username,
      password: formValues.password,
      email: formValues.email,
    }).toPromise().catch((response) => {
      if (response.err === 'username exists') {
        this.errormessage = 'Username already exists'
      } else {
        this.errormessage = 'Email already exists'
      }
    })
  }
}