import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { LoginService } from 'src/app/services/login.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    confirmpassword: new FormControl(),
    email: new FormControl(),
  })

  constructor(private loginService: LoginService , private formBuilder: FormBuilder) { }
errormessage = ''
disabledBtn: boolean
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
      confirmpassword: '',
    })

    this.disabledBtn = true

    this.onChanges()

  }
  // Displays the error message if the passwords do not match
  onChanges(): void {
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
      email: formValues.Email,
    }).toPromise()

  }
}
