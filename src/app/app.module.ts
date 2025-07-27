import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { CardsComponent } from './dashboard/cards/cards.component';
import { ChartComponent } from './dashboard/chart/chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginComponent,
    DashboardComponent,
    ChartComponent,
    CardsComponent,
    AppComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
