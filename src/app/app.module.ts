import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupModule } from './group/group.module';
import { GroupPageRoutingModule } from './group/group-page-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GroupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
