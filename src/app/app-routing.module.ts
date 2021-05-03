import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConfirmComponent} from "./modules/auth/confirm/confirm.component";
import {SignupComponent} from "./modules/auth/signup/signup.component";
import {LoginComponent} from "./modules/auth/login/login.component";
import {HomeComponent} from "./modules/base/home/home.component";
import {SettingsComponent} from "./modules/base/settings/settings.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'confirm-registration', component: ConfirmComponent},
  {path: 'settings', component: SettingsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
