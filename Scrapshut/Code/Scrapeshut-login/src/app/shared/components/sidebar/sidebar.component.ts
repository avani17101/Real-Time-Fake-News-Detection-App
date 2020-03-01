import { Component } from '@angular/core';
import { DataserviceService } from "../../../services/dataservice.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isActive = false;
    showMenu = '';
    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

constructor(private service:DataserviceService){

}
twitter:any[];

// twitter call for get data
makeTwittercall(){
    this.service.makeTwittercall()
    .subscribe(twitter=>{   
       this.twitter = twitter;
        console.log(twitter);
    window.location.href=twitter;
      
    });
}




}
