import { Component } from '@angular/core';
import {AppService} from './service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable,of } from 'rxjs';


@Component({
  selector: 'start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})

export class StartPage {
  title = 'StartPage';
  user = localStorage.getItem('logged_in_user')
  url_text = ""
  CheckWebsiteAns="Website Is Fake !!!!!"
  columns=[]
  character; 
  
  constructor(private service: AppService,private snackbar:MatSnackBar,private router: Router) {}
  
  ngOnInit(){
    if(localStorage.getItem('logged_in_user')==null)
    {
      this.snackbar.open("Have To Login Cannot Enter Page Once Left", "", {
        duration: 2000000, panelClass: 'snackbar_wrong'});
        this.router.navigateByUrl('login')
    }
    let username_data = {username:this.user};
    this.service.get_user_reviews(username_data).subscribe(
      data=>{
          console.log(data.user_reviews);
          this.columns = ["user", "type", "rating", "review", "url"];
          this.character = of(data.user_reviews);
      }
  );
  }
  CheckWebsite(urlc){
    let url_data={url:urlc};
    this.service.check_url(url_data).subscribe(
      data=> {
        this.url_text=urlc
        if(data.ans === 'Fake')
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
  URL_Verification1()
  {
    let url = document.getElementById("url") as HTMLInputElement;
    let url_data={url:url.value};
    this.snackbar.open("Loading Please Wait....", "", {
      duration: 20000,panelClass: 'snackbar_waiting'});
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
  URL_Verification2()
  {
    let url = document.getElementById("url") as HTMLInputElement;
    let url_data={url:url.value};
    this.url_text=url.value;
    this.snackbar.open("Loading Please Wait....", "", {
      duration: 20000,panelClass: 'snackbar_waiting'});
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
          
          this.snackbar.open("URL EXISTS", "", {
            duration: 20000,panelClass: 'snackbar_right'});
            var modal = document.getElementById("myModal");

            // Get the button that opens the modal
            var btn = document.getElementById("myBtn");
            var reviewform = document.getElementById("reviewform") as HTMLFormElement;
            
            // Get the <span> element that closes the modal
            var span = document.getElementById("close");
            
            // When the user clicks the button, open the modal 
            modal.style.display = "block";
            
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
              modal.style.display = "none";
              reviewform.reset();
            }
            
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
              if (event.target == modal) {
                modal.style.display = "none";
                reviewform.reset();

              }
            }
        }
      }
    );
  }
  Dashboard(){
    let username_data = {username:this.user};
    this.service.get_user_reviews(username_data).subscribe(
      data=>{
          console.log(data.user_reviews);
          this.columns = ["user", "type", "rating", "review", "url"];
          this.character = of(data.user_reviews);
      }
  );
    var modal = document.getElementById("tableModal");
            
            // Get the <span> element that closes the modal
    var span = document.getElementById("closetable");
            
            // When the user clicks the button, open the modal 
    modal.style.display = "block";
            
            // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
            
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

  }
  SubmitReview(){
    let type=document.getElementById("value1") as HTMLInputElement;
    let rating=8;
    let star1=document.getElementById("star1") as HTMLInputElement;
    let star2=document.getElementById("star2") as HTMLInputElement;
    let star3=document.getElementById("star3") as HTMLInputElement;
    let star4=document.getElementById("star4") as HTMLInputElement;
    let star5=document.getElementById("star5") as HTMLInputElement;

    if(!type.checked)
    {
      type=document.getElementById("value2") as HTMLInputElement;
      if(!type.checked)
      {
        type=document.getElementById("value3") as HTMLInputElement;
      }
    }
    if(star1.checked)
    {
        rating=Number(star1.value);
    }
    else if(star2.checked)
    {
        rating=Number(star2.value);
    }
    else if(star3.checked)
    {
        rating=Number(star3.value);
    }
    else if(star4.checked)
    {
        rating=Number(star4.value);
    }
    else if(star5.checked)
    {
        rating=Number(star5.value);
    }
    let review= document.getElementById("review") as HTMLInputElement;
    if((type.value==='Other' && !type.checked) || rating==8|| review.value==='')
    {
      this.snackbar.open("Cannot Submit Empty Value", "", {
        duration: 20000,panelClass: 'snackbar_wrong'});
    }
    else {
        var modal = document.getElementById("myModal");
        let review_info={
        type:type.value,
        rating:rating,
        review:review.value,
        user:this.user,
        url:this.url_text
      };
      this.service.add_details(review_info).subscribe(
        data=>{
          if(data.ans==='added')
          {
            this.snackbar.open("Review Successfully Added", "", {
              duration: 20000,panelClass: 'snackbar_right'});
            modal.style.display = "none";
          }
         else
         {
            this.snackbar.open("Review Not Added", "", {
              duration: 20000,panelClass: 'snackbar_wrong'});
         }
       }
      )
    }
  }

  SubmitQueryContact()
  {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let otherformat = /[A-Za-z]/
    let formid =document.getElementById("contactform") as HTMLFormElement;
    let email=document.getElementById("contactemail") as HTMLInputElement;
    let subject=document.getElementById("contactsubject") as HTMLInputElement;
    let message=document.getElementById("contactmessage") as HTMLInputElement;
    if(email.value.match(mailformat) && subject.value.match(otherformat) && message.value.match(otherformat))
    {
      let contactinfo={
        name: this.user,
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