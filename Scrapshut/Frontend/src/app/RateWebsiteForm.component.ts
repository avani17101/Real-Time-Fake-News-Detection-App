import { Component } from '@angular/core';
import {AppService} from './service'
import { Router } from '@angular/router'

@Component({
  selector: 'rating-form',
  templateUrl: './RateWebsiteForm.component.html',
  styleUrls: ['./RateWebsiteForm.component.css']
})
export class RateWebsiteForm 
{
  constructor(private service: AppService, private router: Router) {}
  title = 'RateWebsiteForm';
  URLVerification()
  {
    let url=document.getElementById("urlsearch") as HTMLInputElement;
    let url_json = {
      "url" : url.value
    }
    // console.log("hello")
    localStorage.setItem('url',url.value);
    this.service.verify_url(url_json).subscribe(
      data => {
        if(data.exists === 'no')
        {
          alert("URL Does Not Exist !!")
        }
        else
        {
          console.log("exists")
          this.router.navigateByUrl('RateWebsite')
        }
      }
    )
  }
  
}