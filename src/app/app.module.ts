import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule
} from "@nebular/theme";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {BaseModule} from "./modules/base/base.module";
import {AuthModule} from "./modules/auth/auth.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessagingModule} from "./modules/messaging/messaging.module";
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
    BaseModule,
    AuthModule,
    MessagingModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NbLayoutModule,
    NbSidebarModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbMenuModule.forRoot(),
    NbEvaIconsModule,
    ReactiveFormsModule,
    NbActionsModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
