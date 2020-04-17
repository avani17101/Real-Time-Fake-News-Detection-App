import { Component } from '@angular/core';
import {AppService} from './service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable,of } from 'rxjs';

@Component({
  selector: 'Dashboard',
  templateUrl: './Dashboard.component.html',
})

export class Dashboard {
  title = 'Dashboard';
  user = localStorage.getItem('logged_in_user')
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
    let user_data = {username:this.user};
    this.service.get_user_reviews(user_data).subscribe(
        data=>{
            console.log(data.user_reviews);
            this.columns = ["id", "user", "type", "rating", "review", "url"];
            this.character = of(data.user_reviews);
        }
    );
  }
}