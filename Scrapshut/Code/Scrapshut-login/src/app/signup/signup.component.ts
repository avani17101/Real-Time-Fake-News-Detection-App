import { NgModule, Component, Pipe, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Validators, FormBuilder, NgForm, FormGroup, FormControl } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { DataserviceService } from "../services/dataservice.service";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    constructor(public router: Router, private fb: FormBuilder, private service: DataserviceService) {  }

    ngOnInit() {}
// ********************************************************************************************************************
    //Validation using Reactive Form
   myform = this.fb.group({
        //Email valildation
        Email: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z]+[a-zA-Z0-9]*[^ @]*@[^ @]*[a-zA-Z]*[\.][a-zA-Z]+[a-zA-Z]+")]),
        //password valildation     
        Password: new FormControl('', [Validators.required, Validators.minLength(8),
        Validators.pattern("^(?=.*[0-9])(?=.*[A-Z])(?=.*[@?#$%^&+*=!])(?=\\S+$).{4,}$")
        ]),
        //Password Confirmation         
        ConfirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    },
        //validating password and confirm password field
        { validator: this.checkIfMatchingPasswords('Password', 'ConfirmPassword') }

    );

// ****************************************************************************************************************
    //validation function for password and confirm password field
    checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value || passwordConfirmationInput.invalid) {
                return passwordConfirmationInput.setErrors({ notEquivalent: true })
            }

            else {
                return passwordConfirmationInput.setErrors(null);
            }
        }
    }

// ************************************************************************************************************************
//get method for validations

    get Email() {
        return this.myform.get("Email");

    }
    get Password() {
        return this.myform.get("Password");

    }
    get ConfirmPassword() {
        return this.myform.get("ConfirmPassword");
    }

// ************************************************************************************************************************
 //Form method for Registing User
    element: any;
    onRegister() {
        debugger;
       // this.element = myform.value;
        //console.log(this.element);
        this.service.onRegister(this.myform.value)
            .subscribe(
            newPost => {
                this.myform = newPost;
                console.log(newPost);
                this.router.navigate(['./login']);
            });
    }
}
