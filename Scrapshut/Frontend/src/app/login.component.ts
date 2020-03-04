import { Component } from '@angular/core';
import {AppService} from './service'
import { Router } from '@angular/router'
@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login {
  title = 'Login';
  constructor(private service: AppService, private router: Router) {}
  UserLogin()
  {
    let email=document.getElementById("email") as HTMLInputElement;
    let password =document.getElementById("password") as HTMLInputElement;
    let data_json ={
        email: email.value,
        password:password.value,
    };
    console.log(data_json);
    this.router.navigateByUrl('signup');
    this.service.user_login(data_json).subscribe(
        data => {
          if(data.ans === 'loggedin')
          {
              alert("LoggedIn");
              this.router.navigateByUrl('StartPage');
              localStorage.setItem('email', data_json.email)
            // alert();
          }
          else
          {
              alert("Incorrect Credentials");
          }
          
        })
    }
}