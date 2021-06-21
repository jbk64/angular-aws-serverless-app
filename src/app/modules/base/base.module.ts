import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from "./menu/menu.component";
import {HomeComponent} from './home/home.component';
import {
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbChatModule,
  NbContextMenuModule, NbInputModule,
  NbLayoutModule,
  NbMenuModule, NbToggleModule
} from "@nebular/theme";
import {MessagingModule} from "../messaging/messaging.module";
import {SettingsComponent} from './settings/settings.component';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [MenuComponent, HomeComponent, SettingsComponent, HeaderComponent],
  exports: [
    HomeComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbMenuModule,
    NbLayoutModule,
    NbAlertModule,
    NbChatModule,
    MessagingModule,
    NbButtonModule,
    NbContextMenuModule,
    NbActionsModule,
    RouterModule,
    NbInputModule,
    NbToggleModule
  ]
})
export class BaseModule {
}
