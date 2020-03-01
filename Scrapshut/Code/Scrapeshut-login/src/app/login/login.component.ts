import {NgModule, Component,Pipe, OnInit} from '@angular/core';
import { ReactiveFormsModule, FormsModule, Validators, FormBuilder, NgForm, FormGroup, FormControl } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from "../shared/guard/auth.service";
import { DataserviceService } from "../services/dataservice.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    constructor(public router: Router,private fb: FormBuilder, private authservice: AuthService,private service:DataserviceService) {}

    //form field validators by abhishek
    myform = new FormGroup({
        //email validator
        email: new FormControl('', [Validators.required, 
        Validators.pattern("[a-zA-Z]+[a-zA-Z0-9]*[^ @]*@[^ @]*[a-zA-Z]*[\.][a-zA-Z]+[a-zA-Z]+")
        ]),
        //password validator
        password: new FormControl('', [Validators.required, Validators.minLength(8), 
         Validators.pattern("^(?=.*[0-9])(?=.*[A-Z])(?=.*[@?#$%^&+*=!])(?=\\S+$).{4,}$")
        ])
    });

get email(){
return this.myform.get("email");

}
get password(){
return this.myform.get("password");

}
// ****************************************************************************************************************************
//Login method
 public loading:boolean = false;
 error = '';

ngOnInit(){
//this.authservice.logout();
}

//main method
    login() {
      debugger;
      //this.loading = true;
        this.authservice.login(this.myform.value)
            .subscribe(result => {              
                debugger;
                if (result === true) {
                    // login successful
                    this.loading = true;
                   // this.router.navigate(['app/layout/dashboard']);
                    this.router.navigate(['/']);
                    console.log(result);            
                    // this.router.navigate(['./dashboard']);            
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
              
            },        
            err => console.log(err)
             
            );
          
    }

}