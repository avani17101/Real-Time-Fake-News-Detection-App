import { Component } from '@angular/core';
import {AppService} from './service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


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
    console.log(url.value)
  }
  URL_Verification()
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

}