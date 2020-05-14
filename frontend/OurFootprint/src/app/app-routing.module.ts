import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { TestComponent } from './components/test/test.component'
import { HomeComponent } from './components/home/home.component'
import { AboutUsComponent } from './components/about-us/about-us.component'
import { SponsorsComponent } from './components/sponsors/sponsors.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'our-sponsors', component: SponsorsComponent},
  {path: 'test', component: TestComponent},
  {path: 'dash', component: DashboardComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
