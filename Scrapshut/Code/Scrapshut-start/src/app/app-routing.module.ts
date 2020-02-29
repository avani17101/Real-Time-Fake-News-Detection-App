import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RateWebsiteForm} from './RateWebsiteForm.component'
import {StartPage} from './start-page.component'
import {LoginComponent} from './login/login.component'


const routes: Routes = [
  { path : '', component: StartPage},
  { path: 'RatingForm', component: RateWebsiteForm},
  { path: 'LoginForm', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [RateWebsiteForm, StartPage]
