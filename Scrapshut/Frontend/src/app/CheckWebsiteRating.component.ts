import { Component } from '@angular/core';
import {AppService} from './service'
import { Router } from '@angular/router'
@Component({
  selector: 'CheckWebsiteRating',
  templateUrl: './CheckWebsiteRating.component.html',
  styleUrls: ['./CheckWebsiteRating.component.css']
})
export class CheckWebsiteRating {
  title = 'CheckWebsiteRating';
  constructor(private service: AppService, private router: Router) {}
  CheckReview()
  {
    // let type=document.getElementById("type") as HTMLInputElement;
    // let rating =document.getElementById("Rating") as HTMLInputElement;
    // let review=document.getElementById("Review") as HTMLInputElement;
    console.log("hello");
    let data_json ={
        // type: type.value,
        // rating:rating.value,
        // review:review.value,
        url: localStorage.getItem('url'),
    };
    console.log(data_json);
    // alert("Review Added");
    // this.router.navigateByUrl('');
    // this.service.check_review(data_json).subscribe(
    //     data => {
    //       if(data.ans === 'added')
    //       {
    //         this.router.navigateByUrl('');
    //       }
    //       else
    //       {
    //           alert("Not Added");
    //       }
        
    //     })
    console.log("wow")
  }
}