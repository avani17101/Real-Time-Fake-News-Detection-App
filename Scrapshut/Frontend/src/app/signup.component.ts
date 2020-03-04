import { Component } from '@angular/core';
import {AppService} from './service'
import { Router } from '@angular/router'

@Component({
  selector: 'Login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUp 
{
  title = 'SignUp';
  constructor(private service: AppService, private router: Router) {}
  SignUp()
  {
    let email=document.getElementById("email") as HTMLInputElement;
    let password =document.getElementById("password") as HTMLInputElement;
    let data_json ={
        email: email.value,
        password:password.value,
    };
    console.log(data_json);
    this.service.user_signup(data_json).subscribe(
        data => {
          if(data.ans === 'added')
          {
            alert("User Has Been Added");
            
          }
          else
          {
              alert("User Not Added");
          }
        
        })
    }
  
}