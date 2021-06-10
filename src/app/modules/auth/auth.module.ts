import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ConfirmComponent} from "./confirm/confirm.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NbAlertModule, NbButtonModule, NbCardModule, NbInputModule, NbLayoutModule} from "@nebular/theme";



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ConfirmComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NbInputModule,
        NbCardModule,
        NbButtonModule,
        NbAlertModule,
        NbLayoutModule
    ]
})
export class AuthModule { }
