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
import { ProfilePageModule } from './profile/profile-page.module';
import { ProfilePageRoutingModule } from './profile/profile-page-routing.module';
import { LoginComponent } from './auth/presentation/login/login.component';
import { RegisterComponent } from './auth/presentation/register/register.component';
import { CardGroupComponent } from './profile/presentation/components/card-group/card-group.component';
import { ListGroupComponent } from './profile/presentation/components/list-group/list-group.component';
import { AboutmeComponent } from './profile/presentation/components/aboutme/aboutme.component';
import { NetworkComponent } from './profile/presentation/components/network/network.component';
import { ContactComponent } from './profile/presentation/components/contact/contact.component';
import { ArticleComponent } from './profile/presentation/components/article/article.component';
import { FingerprintComponent } from './profile/presentation/components/fingerprint/fingerprint.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AboutmeComponent,
    NetworkComponent,
    ContactComponent,
    ArticleComponent,
    FingerprintComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomePageRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ProfilePageRoutingModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
