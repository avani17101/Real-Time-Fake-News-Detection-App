import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RateWebsiteForm} from './RateWebsiteForm.component'
import {StartPage} from './start-page.component'
import {RateWebsite} from './RateWebsite.component'
import {CheckWebsiteRating} from './CheckWebsiteRating.component'
import {Home_Page} from './HomePage'
import {SignUp} from './signup.component'
import {Login} from './login.component'
import {Dashboard} from './Dashboard.component'

const routes: Routes = [
  {path : '', component: Home_Page},
  {path : 'signup', component: SignUp},
  {path : 'login', component: Login},
  { path : 'StartPage', component: StartPage},
  { path: 'RatingForm', component: RateWebsiteForm},
  { path: 'RateWebsite', component: RateWebsite},
  { path: 'CheckWebsiteRating', component: CheckWebsiteRating},
  { path: 'Dashboard', component: Dashboard},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [Home_Page,SignUp,RateWebsiteForm, StartPage, RateWebsite,CheckWebsiteRating,Dashboard]
