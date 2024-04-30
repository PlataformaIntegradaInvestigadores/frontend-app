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

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomePageRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
