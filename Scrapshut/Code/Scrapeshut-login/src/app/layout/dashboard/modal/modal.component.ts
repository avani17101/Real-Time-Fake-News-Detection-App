import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataserviceService } from "../../../services/dataservice.service";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    closeResult: string;
    constructor(private modalService: NgbModal,private service:DataserviceService) { }

// ***********************************************************************************************************
//to open modal
    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

 //to close modal
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

// *************************************************************************************************************************
// twitter call for get data
twitter:any[];
makeTwittercall(){
    this.service.makeTwittercall()
    .subscribe(twitter=>{   
       this.twitter = twitter;
        console.log(twitter);
    window.location.href=twitter;
      
    });
}

// ****************************************************************************************************************************
// instagram call for get data
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
