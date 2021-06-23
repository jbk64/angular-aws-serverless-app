import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CognitoService} from "../../services/cognito.service";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  error

  constructor(
    private formBuilder: FormBuilder,
    private cognitoService: CognitoService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLogin(): void {
    const {username, password} = this.loginForm.value
    this.cognitoService
      .login(username, password, {
        onSuccess: result => {
          const token = result.getIdToken().getJwtToken()
          this.localStorageService.setItem('token', token)
          this.router.navigate(['']);
        },
        onFailure: error => {
          this.error = error
        }
      })
  }
}
