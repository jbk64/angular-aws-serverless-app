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
import {ReactiveFormsModule} from "@angular/forms";
import {MessagingModule} from "./modules/messaging/messaging.module";

@NgModule({
  declarations: [
    AppComponent
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
    NbActionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
