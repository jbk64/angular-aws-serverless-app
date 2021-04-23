import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CognitoService} from "../../services/cognito.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-verification',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  confirmationForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private cognitoService: CognitoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.confirmationForm = this.formBuilder.group({
      code: ['', Validators.required]
    })
  }

  onConfirm(): void {
    const username = this.route.snapshot.queryParamMap.get('username')
    const { code } = this.confirmationForm.value
    this.cognitoService.confirmRegistration(username, code, (error, result) => {
      if (error) {
        console.error(error)
      } else {
        this.router.navigate([''])
      }
    })
  }
  onResend(): void {
    // TODO: implement
  }
}
