import { Component } from '@angular/core';
import {AppService} from './service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})

export class StartPage {
  title = 'StartPage';
  user = localStorage.getItem('logged_in_user')
  url_text = "" 
  constructor(private service: AppService,private snackbar:MatSnackBar,private router: Router) {}
  ngOnInit(){
    if(localStorage.getItem('logged_in_user')==null)
    {
      this.snackbar.open("Have To Login Cannot Enter Page Once Left", "", {
        duration: 2000000, panelClass: 'snackbar_wrong'});
        this.router.navigateByUrl('login')
    }
  }
  URL_Verification1()
  {
    console.log("hello");
    let url = document.getElementById("url") as HTMLInputElement;
    let url_data={url:url.value};
    this.snackbar.open("Loading Please Wait....", "", {
      duration: 20000,panelClass: 'snackbar_waiting'});
    this.service.verify_url(url_data).subscribe(
      data=> {
        console.log(data.exists)
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
            this.router.navigateByUrl('CheckWebsiteRating')
        }
      }
    );
  }
  URL_Verification2()
  {
    console.log("hello");
    let url = document.getElementById("url") as HTMLInputElement;
    let url_data={url:url.value};
    this.url_text=url.value;
    this.snackbar.open("Loading Please Wait....", "", {
      duration: 20000,panelClass: 'snackbar_waiting'});
    this.service.verify_url(url_data).subscribe(
      data=> {
        console.log(data.exists)
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
            
            // Get the <span> element that closes the modal
            var span = document.getElementById("close");
            
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
      }
    );
  }
  SubmitReview(){
    let type=document.getElementById("value1") as HTMLInputElement;
    if(!type.checked)
    {
      type=document.getElementById("value2") as HTMLInputElement;
      if(!type.checked)
      {
        type=document.getElementById("value3") as HTMLInputElement;
      }
    }
    let rating=document.getElementById("rating") as HTMLInputElement;
    let review= document.getElementById("review") as HTMLInputElement;
    if((type.value==='Other' && !type.checked) || rating.value==='0'|| review.value==='')
    {
      this.snackbar.open("Cannot Submit Empty Value", "", {
        duration: 20000,panelClass: 'snackbar_wrong'});
    }
    else {
        var modal = document.getElementById("myModal");
        let review_info={
        type:type.value,
        rating:rating.value,
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
}