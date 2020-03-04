import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RateWebsiteForm} from './RateWebsiteForm.component'
import {StartPage} from './start-page.component'
import {RateWebsite} from './RateWebsite.component'
import {CheckWebsiteURL} from './CheckWebsiteForm.component';
import {CheckWebsiteRating} from './CheckWebsiteRating.component'
import {Home_Page} from './Before_Login_Page.component'
import {SignUp} from './signup.component'
import {Login} from './login.component'

const routes: Routes = [
  {path : 'homepage', component: Home_Page},
  {path : '' , redirectTo:'homepage', pathMatch:'full'},
  {path : 'signup', component: SignUp},
  {path : 'login', component: Login},
  { path : 'StartPage', component: StartPage},
  { path: 'RatingForm', component: RateWebsiteForm},
  { path: 'RateWebsite', component: RateWebsite},
  { path: 'CheckWebsiteURL', component: CheckWebsiteURL},
  { path: 'CheckWebsiteRating', component: CheckWebsiteRating},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [Home_Page,SignUp,RateWebsiteForm, StartPage, RateWebsite,CheckWebsiteURL,CheckWebsiteRating]
