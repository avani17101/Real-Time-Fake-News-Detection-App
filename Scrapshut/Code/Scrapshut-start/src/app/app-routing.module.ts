import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RateWebsiteForm} from './RateWebsiteForm.component'
import {StartPage} from './start-page.component'



const routes: Routes = [
  { path : '', component: StartPage},
  { path: 'RatingForm', component: RateWebsiteForm},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [RateWebsiteForm, StartPage]
