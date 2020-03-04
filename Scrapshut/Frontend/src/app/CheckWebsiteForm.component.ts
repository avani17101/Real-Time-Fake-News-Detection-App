import { Component } from '@angular/core';
import {AppService} from './service'
import { Router } from '@angular/router'

@Component({
  selector: 'checking-form',
  templateUrl: './CheckWebsiteForm.component.html',
  styleUrls: ['./CheckWebsiteForm.component.css']
})
export class CheckWebsiteURL 
{
  constructor(private service: AppService, private router: Router) {}
  title = 'CheckWebsiteForm';
  URLVerification()
  {
    let url=document.getElementById("urlsearch") as HTMLInputElement;
    let url_json = {
      "url" : url.value
    }
    localStorage.setItem('url',url.value);
    this.service.verify_url(url_json).subscribe(
      data => {
        console.log(data);
        if(data.exists === 'no')
        {
          alert("URL Does Not Exist !!")
        }
        else
        {
          this.router.navigateByUrl('CheckWebsiteRating')
        }
      }
    )
  }
  
}