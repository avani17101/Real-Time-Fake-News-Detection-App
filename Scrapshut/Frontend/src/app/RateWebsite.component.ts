import { Component } from '@angular/core';
import {AppService} from './service'
import { Router } from '@angular/router'
@Component({
  selector: 'RateWebsite',
  templateUrl: './RateWebsite.component.html',
  styleUrls: ['./RateWebsite.component.css']
})
export class RateWebsite {
  title = 'RateWebsite';
  constructor(private service: AppService, private router: Router) {}
  AddReview()
  {
    let type=document.getElementById("type") as HTMLInputElement;
    let rating =document.getElementById("Rating") as HTMLInputElement;
    let review=document.getElementById("Review") as HTMLInputElement;
    console.log("hello");
    let data_json ={
        type: type.value,
        rating:rating.value,
        review:review.value,
        url: localStorage.getItem('url'),
    };
    console.log(data_json);
    alert("Review Added");
    this.router.navigateByUrl('StartPage');
    this.service.add_details(data_json).subscribe(
        data => {
          if(data.ans === 'added')
          {
            this.router.navigateByUrl('');
          }
          else
          {
              alert("Not Added");
          }
        
        })
  }
}