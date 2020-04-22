import { Component } from '@angular/core';
import {AppService} from './service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';


@Component({
  selector: 'home-page',
  templateUrl: './HomePage.html',
  styleUrls: ['./HomePage.scss']
})
export class Home_Page {
  title = 'HomePage';
  url_text="";
  CheckWebsiteAns="Website Is Fake !!!!!";
  constructor(private service: AppService, private router: Router, private snackbar:MatSnackBar) {}
  ngOnInit()
  {
    localStorage.clear();
    let url = document.getElementById("url") as HTMLInputElement;
  }
  CheckWebsite(urlc)
  {
    let url_data={url:urlc};
    this.service.check_url(url_data).subscribe(
      data=> {
        this.url_text=urlc
        if(data.ans === 'Fake')
        {
          this.CheckWebsiteAns="Website Is Fake !!!!!";
        }
        else if ( data.ans === 'Page Unavailable')
        {
          this.CheckWebsiteAns="Website Is Fake !!!!!";
        }
        else if ( data.ans === 'True')
        {
          this.CheckWebsiteAns="Website Is Not Fake, i.e It Is Reliable !!!";
        }
        else
        {
          this.CheckWebsiteAns="Website Has Fake - Links in Article, i.e Proceed At Your Own Risk !!!";
        }
        var modal = document.getElementById("fake_box");
            
            // Get the <span> element that closes the modal
        var button = document.getElementById("AnsButton");
                
                // When the user clicks the button, open the modal 
        modal.style.display = "block";
                
                // When the user clicks on <span> (x), close the modal
        button.onclick = function() {
          modal.style.display = "none";
      }
      }
    );
  }
  URL_Verification()
  {
    let url = document.getElementById("url") as HTMLInputElement;
    let url_data={url:url.value};
    this.snackbar.open("Loading Please Wait....", "", {
      duration: 200000,panelClass: 'snackbar_waiting'});
    this.service.verify_url(url_data).subscribe(
      data=> {
        if(data.exists==='no')
        { 
          // alert("URL DOES NOT EXIST")
          this.snackbar.open("URL DOES NOT EXISTS", "", {
            duration: 20000,panelClass: 'snackbar_wrong'});
        }
        else
        {
          // alert("URL EXISTS")
          
          this.snackbar.open("URL EXISTS Let's Check If It's Fake Or Not", "", {
            duration: 20000,panelClass: 'snackbar_right'});
            this.CheckWebsite(url.value)
        }
      }
    );
  }

  SubmitQueryContact()
  {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let otherformat = /[A-Za-z]/
    let formid =document.getElementById("contactform") as HTMLFormElement;
    let name=document.getElementById("contactname") as HTMLInputElement;
    let email=document.getElementById("contactemail") as HTMLInputElement;
    let subject=document.getElementById("contactsubject") as HTMLInputElement;
    let message=document.getElementById("contactmessage") as HTMLInputElement;
    if(name.value.match(otherformat) && email.value.match(mailformat) && subject.value.match(otherformat) && message.value.match(otherformat))
    {
      let contactinfo={
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value
      }
      formid.reset()
      this.service.send_contact_info(contactinfo).subscribe(
        data=>{

        }
      )
      this.snackbar.open("Sent Details", "", {
        duration: 20000,panelClass: 'snackbar_right'});
    }
    else
    {
      this.snackbar.open("Please Check Details", "", {
        duration: 20000,panelClass: 'snackbar_wrong'});
    }

  }

}