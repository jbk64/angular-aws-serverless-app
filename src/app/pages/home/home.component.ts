import { Component, OnInit } from '@angular/core';
import {CognitoUser} from "amazon-cognito-identity-js";
import {CognitoService} from "../../services/cognito.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: CognitoUser

  constructor(
    private cognitoService: CognitoService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.currentUser = this.cognitoService.getCurrentUser()
    console.log(this.currentUser)
  }

  onLogout() {
    this.cognitoService.logout()
    location.reload()
  }
}
