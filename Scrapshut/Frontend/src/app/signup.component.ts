import { Component } from '@angular/core';
import {AppService} from './service'
import { Router } from '@angular/router'
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'SignUp',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUp 
{
  
  title = 'SignUp';
  constructor(private service: AppService, private router: Router, private snackbar:MatSnackBar) {}

  ngOnInit()
  {
    localStorage.clear();
  }

  SignUp()
  {
    let name=document.getElementById("name") as HTMLInputElement;
    let email=document.getElementById("email") as HTMLInputElement;
    let username=document.getElementById("username") as HTMLInputElement;
    let password =document.getElementById("password") as HTMLInputElement;
    let password_check=document.getElementById("confirm_password") as HTMLInputElement
    let passwordformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let usernameformat = /[A-Za-z]/
    let passmatch=0;
    let passcheck=0;
    let emailcheck=0;
    let usernamecheck=0;
    if(password.value === password_check.value)
    {
      passmatch=1;
    }
    if(password.value.match(passwordformat)) 
    { 
      passcheck=1;
    }
    if(email.value.match(mailformat))
    {
      emailcheck=1;
    }
    if(username.value.match(usernameformat))
    {
      usernamecheck=1;
    }
    let user_data = {
      name: name.value,
      email : email.value,
      username : username.value,
      password : password.value,
    }
    if (passmatch==1 && passcheck==1 && emailcheck==1 && usernamecheck==1)
    {
        this.service.user_signup(user_data).subscribe(
          data => {
            if(data.ans === 'same email')
            {
              this.snackbar.open("Email Already Used", "", {
                duration: 2000000, panelClass: 'snackbar_wrong'});
            }
            else if (data.ans === 'same username')
            {
              this.snackbar.open("Username Already Exists", "", {
                duration: 2000000, panelClass: 'snackbar_wrong'});
            }
            else if (data.ans === 'added')
            {
              this.snackbar.open("Congrats Account Has Been Made Proceed To Login Page", "", {
                duration: 200000,panelClass: 'snackbar_right'});
            }
            else
            {
              this.snackbar.open("Error! Could Not Add Account", "", {
                duration: 200000, panelClass: 'snackbar_wrong'});
            }
          }
        )
    }
    else
    {
      if(passmatch==0)
      {
        this.snackbar.open("Passwords Do Not Match", "", {
          duration: 200000, panelClass: 'snackbar_wrong'});
      }
      if(passcheck==0)
      {
        this.snackbar.open("Password Should Contain 6-20 Characters which contain at least one numeric digit, one uppercase and one lowercase letter", "", {
          duration: 200000,panelClass: 'snackbar_wrong'});
      }
      if(emailcheck==0)
      {
        this.snackbar.open("Not An Email Format", "", {
          duration: 200000,panelClass: 'snackbar_wrong'});
      }
      if(usernamecheck==0)
      {
        this.snackbar.open("Username Must Contain Atleast 1 Alphabetical Character", "", {
          duration: 200000,panelClass: 'snackbar_wrong'});
      }
    }
  }
  
}