import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { HttpClientModule } from '@angular/common/http'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { MaterialModule } from './material/material.module'

import { AppComponent } from './app.component'
import { TestComponent } from './components/test/test.component'
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component'
import { HomeComponent } from './components/home/home.component'
import { AboutUsComponent } from './components/about-us/about-us.component'
import { SponsorsComponent } from './components/sponsors/sponsors.component'
import { CalculatorComponent } from './components/home/calculator/calculator.component'
import { UtilitiesComponent } from './components/home/calculator/utilities/utilities.component'
import { TransportationComponent } from './components/home/calculator/transportation/transportation.component'
import { HydroComponent } from './components/home/calculator/hydro/hydro.component'
import { FortisComponent } from './components/home/calculator/fortis/fortis.component'
import { LoginComponent } from './components/login/login.component'
import { SignupComponent } from './components/signup/signup.component'

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
    HydroComponent,
    FortisComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
