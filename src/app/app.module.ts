import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfilePageRoutingModule } from './profile/profile-page-routing.module';
import { LoginComponent } from './auth/presentation/login/login.component';
import { RegisterComponent } from './auth/presentation/register/register.component';
import { AboutmeComponent } from './profile/presentation/components/aboutme/aboutme.component';
import { NetworkComponent } from './profile/presentation/components/network/network.component';
import { ContactComponent } from './profile/presentation/components/contact/contact.component';
import { ArticleComponent } from './profile/presentation/components/article/article.component';
import { FingerprintComponent } from './profile/presentation/components/fingerprint/fingerprint.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    SharedModule,
    BrowserAnimationsModule,
    ProfilePageRoutingModule,
    FontAwesomeModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
