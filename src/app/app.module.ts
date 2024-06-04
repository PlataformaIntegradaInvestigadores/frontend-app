import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ProfilePageRoutingModule } from './profile/profile-page-routing.module';
import { LoginComponent } from './auth/presentation/login/login.component';
import { RegisterComponent } from './auth/presentation/register/register.component';
import { NetworkComponent } from './profile/presentation/components/network/network.component';
import { ContactComponent } from './profile/presentation/components/contact/contact.component';
import { ArticleComponent } from './profile/presentation/components/article/article.component';
import { FingerprintComponent } from './profile/presentation/components/fingerprint/fingerprint.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomePageModule } from "./search-engine/presentation/home-page/home-page.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NetworkComponent,
    ContactComponent,
    ArticleComponent,
    FingerprintComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    ProfilePageRoutingModule,
    FontAwesomeModule,
    HomePageModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
