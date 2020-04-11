import { Component } from '@angular/core';
import {AppService} from './service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CheckWebsiteRating } from './CheckWebsiteRating.component';


@Component({
  selector: 'home-page',
  templateUrl: './HomePage.html',
  styleUrls: ['./HomePage.scss']
})
export class Home_Page {
  title = 'HomePage';
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
        if(data.ans === 'scraped website')
        {
          this.snackbar.open("Scraped Website", "", {
            duration: 20000,panelClass: 'snackbar_right'});
        }
        else
        {
          this.snackbar.open("Could Not Scrape", "", {
            duration: 20000,panelClass: 'snackbar_wrong'});
        }
      }
    );
  }
  URL_Verification()
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
          
          this.snackbar.open("URL EXISTS", "", {
            duration: 20000,panelClass: 'snackbar_right'});
            this.CheckWebsite(url.value)
        }
      }
    );
  }

}