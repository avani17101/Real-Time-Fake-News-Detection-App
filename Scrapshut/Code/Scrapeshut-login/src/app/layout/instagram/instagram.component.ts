import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DataserviceService } from "../../services/dataservice.service";

@Component({
    selector: 'app-instagram',
    templateUrl: './instagram.component.html',
    styleUrls: ['./instagram.component.scss'],
    animations: [routerTransition()]
})
export class InstagramComponent implements OnInit {
    
  constructor(private service:DataserviceService ) { }
    ngOnInit() { }
//*********************************************************************************************************************
//Instagram post method
instagrm:any[];
makeInstagramcall(){
    this.service.makeInstagramcall()
    .subscribe(instagrm=>{   
       this.instagrm = instagrm;
        console.log(instagrm);
    window.location.href=instagrm;
      
    });
}
}
