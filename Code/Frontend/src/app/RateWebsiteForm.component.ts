import { Component } from '@angular/core';

@Component({
  selector: 'rating-form',
  templateUrl: './RateWebsiteForm.component.html',
  styleUrls: ['./RateWebsiteForm.component.css']
})
export class RateWebsiteForm {
  title = 'RateWebsiteForm';
  URLVerification()
  {
    // let x=(document.getElementById("urlsearch") as HTMLInputElement).value;
    // console.log(x)
    let url=document.getElementById("urlsearch") as HTMLInputElement;
    var request=new XMLHttpRequest();
    request.open("GET", url.value);
    if (request.status == 404) { console.log("no") }
    else
    {
        console.log("yes")
    }

    }
  }