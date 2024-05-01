import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomePageRoutingModule } from './search-engine/presentation/home-page/home-page-rounting.module';
import { HomePageComponent } from './search-engine/presentation/home-page/pages/home-page/home-page.component';
import { SearchBoxComponent } from './shared/components/search-box/search-box.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './search-engine/presentation/home-page/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfilePageModule } from './profile/presentation/profile-page/profile-page.module';
import { ProfilePageRoutingModule } from './profile/presentation/profile-page/profile-page-routing.module';
import { LoginComponent } from './auth/presentation/login/login.component';
import { RegisterComponent } from './auth/presentation/register/register.component';
import { CardGroupComponent } from './profile/presentation/components/card-group/card-group.component';
import { ListGroupComponent } from './profile/presentation/components/list-group/list-group.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomePageRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ProfilePageRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
