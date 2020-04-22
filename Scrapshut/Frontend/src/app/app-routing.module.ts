import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StartPage} from './start-page.component'
import {Home_Page} from './HomePage'
import {SignUp} from './signup.component'
import {Login} from './login.component'

const routes: Routes = [
  {path : '', component: Home_Page},
  {path : 'signup', component: SignUp},
  {path : 'login', component: Login},
  { path : 'StartPage', component: StartPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [Home_Page,SignUp,StartPage,Login]
