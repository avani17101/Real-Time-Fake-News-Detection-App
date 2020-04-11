import { Component } from '@angular/core';
import {AppService} from './service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login 
{
  title = 'Login';
  constructor(private service: AppService, private router: Router, private snackbar:MatSnackBar) {}
  ngOnInit()
  {
    localStorage.clear();
  }
  UserLogin()
  {
    let email=document.getElementById("email") as HTMLInputElement;
    let password =document.getElementById("password") as HTMLInputElement;
    let user_data ={
        email: email.value,
        password:password.value,
    };
    this.service.user_login(user_data).subscribe(
        data => {
          if(data.ans === 'Logged In')
          {
            this.snackbar.open("Successfully Logged In", "", {
              duration: 20000,panelClass: 'snackbar_right'});
            localStorage.setItem("logged_in_user", data.username)
            this.router.navigateByUrl('StartPage')

          }
          else
          {
            this.snackbar.open("Incorrect Credentials", "", {
              duration: 20000,panelClass: 'snackbar_wrong'});
          }
          
        })
    }
}