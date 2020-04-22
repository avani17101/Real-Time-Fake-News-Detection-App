import { Component } from '@angular/core';
import {AppService} from './service'
import { Router } from '@angular/router'
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';



@Component({
  selector: 'SignUp',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUp 
{
  
  title = 'SignUp';
  checkcredential=0;
  number_of_otp_attempts=0;
  otp="000000";
  user_data = {
    name: "",
    email : "",
    username : "",
    password : "",
  }
  constructor(private service: AppService, private router: Router, private snackbar:MatSnackBar,private dialog: MatDialog) {}

  ngOnInit()
  {
    if(localStorage.getItem("OTPTimeout")==="1")
    {this.snackbar.open("Sorry Your OTP has Timed Out Please Try Again", "", {
      duration: 2000000, panelClass: 'snackbar_wrong'});}
    localStorage.clear();
    this.number_of_otp_attempts=0;
  }

  CheckCredentials(user_data)
  {
    this.service.credential_check(user_data).subscribe(
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
        else
        {
          this.checkcredential=1;
        }
      });
  }

  OTPTimeout()
  {
    localStorage.setItem("OTPTimeout","1");
    window.location.reload(); 
  }
  OTP_Mail(otp_data)
  {
    this.service.otp_mail(otp_data).subscribe(
      data=>{
        setTimeout(this.OTPTimeout, 300000);
        console.log("hello");
      }
      ) ;
    }

    OTPGiven()
    {
      var OB = document.getElementById("OTPButton") as HTMLInputElement;
      OB.disabled=true;
      if(this.number_of_otp_attempts>=3)
      {
        this.snackbar.open("3 Wrong Attempts Please Try Again Later", "", {
          duration: 200000, panelClass: 'snackbar_wrong'});
        OB.disabled=false;
        this.router.navigateByUrl('')
      }
      let otpgiven=document.getElementById("OTP") as HTMLInputElement;
    if(this.otp==otpgiven.value)
    { OB.disabled=true;
      this.RegisterAccount(this.user_data);
    }
    else
    {
      OB.disabled=false;
      this.snackbar.open("Wrong Attempt Please Try Again", "", {
      duration: 200000, panelClass: 'snackbar_wrong'});
      this.number_of_otp_attempts=this.number_of_otp_attempts+1;
      if(this.number_of_otp_attempts>=3)
      {
        this.snackbar.open("3 Wrong Attempts Please Try Again Later", "", {
          duration: 200000, panelClass: 'snackbar_wrong'});
        OB.disabled=false;
        this.router.navigateByUrl('')
      }
    }
  }

  RegisterAccount(user_data)
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
          this.snackbar.open("Congrats Account Has Been Made Please Login Page", "", {
            duration: 200000,panelClass: 'snackbar_right'});
            this.router.navigateByUrl('login')
        }
        else
        {
          this.snackbar.open("Error! Could Not Add Account", "", {
            duration: 200000, panelClass: 'snackbar_wrong'});
        }
      }
    )
  }

  SignUp()
  {
    let name=document.getElementById("name") as HTMLInputElement;
    let email=document.getElementById("email") as HTMLInputElement;
    let username=document.getElementById("username") as HTMLInputElement;
    let password =document.getElementById("password") as HTMLInputElement;
    let password_check=document.getElementById("confirm_password") as HTMLInputElement
    let passwordformat = /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let usernameformat = /[A-Za-z]/
    let passmatch=0;
    let passcheck=0;
    let emailcheck=0;
    let usernamecheck=0;
    this.otp=(Math.floor(Math.random() * (999999 - 100000 + 1) ) + 100000).toString();

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
    this.user_data = {
      name: name.value,
      email : email.value,
      username : username.value,
      password : password.value,
    }
    let otp_data = {
      email: email.value,
      otp: this.otp,
      username: username.value
    }
    if (passmatch==1 && passcheck==1 && emailcheck==1 && usernamecheck==1)
    {
        this.CheckCredentials(this.user_data);

        if(this.checkcredential==1)
        { 
          var OTPinput = document.getElementById("OTP");
          var OTPbutton = document.getElementById("OTPButton");
          var Name = document.getElementById("name") as HTMLInputElement;
          var Email = document.getElementById("email") as HTMLInputElement;
          var UN = document.getElementById("username") as HTMLInputElement;
          var Pass = document.getElementById("password") as HTMLInputElement;
          var PassCheck = document.getElementById("confirm_password") as HTMLInputElement;
          var SB = document.getElementById("SubmitButton") as HTMLInputElement;
          Name.disabled=true;
          Email.disabled=true;
          UN.disabled=true;
          Pass.disabled=true;
          PassCheck.disabled=true;
          SB.disabled=true;
          OTPinput.style.display="block";
          OTPbutton.style.display="block";
          this.OTP_Mail(otp_data)
          this.snackbar.open("OTP Sent To Account ----  It May Take A While It May Also Check Spam", "", {
            duration: 200000,panelClass: 'snackbar_right'});
        }
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
        this.snackbar.open("Password Should Contain 6-20 Characters which contain at least one numeric digit, one uppercase, one lowercase letter and 1 Special Charater--[!@#$%^&*()]", "", {
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