import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LayoutComponent } from './components/layout/layout.component';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { LoginComponent } from './components/login/login.component';
import {RouterModule} from "@angular/router";
import { SignupComponent } from './components/signup/signup.component';
import { ConfirmRegistrationComponent } from './components/confirm-registration/confirm-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ConversationListComponent,
    ConversationComponent,
    LoginComponent,
    SignupComponent,
    ConfirmRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbEvaIconsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
