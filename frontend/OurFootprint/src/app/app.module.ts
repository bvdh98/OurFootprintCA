import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { TestComponent } from './components/test/test.component'

import { HttpClientModule } from '@angular/common/http'

import { MaterialModule } from './material/material.module'
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component'
import { HomeComponent } from './components/home/home.component'
import { AboutUsComponent } from './components/about-us/about-us.component'
import { SponsorsComponent } from './components/sponsors/sponsors.component'
import { CalculatorComponent } from './components/home/calculator/calculator.component'
import { UtilitiesComponent } from './components/home/calculator/utilities/utilities.component'
import { TransportationComponent } from './components/home/calculator/transportation/transportation.component'

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    SponsorsComponent,
    CalculatorComponent,
    UtilitiesComponent,
    TransportationComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
