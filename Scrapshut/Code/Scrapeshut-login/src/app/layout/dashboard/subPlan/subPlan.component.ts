import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataserviceService } from "../../../services/dataservice.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

@Component({
    selector: 'app-subPlan',
    templateUrl: './subPlan.component.html',
    styleUrls: ['./subPlan.component.scss']
})
export class SubPlanComponent implements OnInit {
    closeResult: string;

    constructor(private fb: FormBuilder, private router:Router,private modalService: NgbModal,private service:DataserviceService) { }

ngOnInit(){

}
    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }


 myform=new FormGroup({
        title:new FormControl('', [Validators.required, 
        Validators.pattern("[A-Za-z]+")
        ]),

        price:new FormControl('', [Validators.required,
        Validators.pattern("[0-9]+")
        ]),

        NOA:new FormControl('', [Validators.required,
                Validators.pattern("[0-9]+")
        ]),
        select:new FormControl('',[Validators.required]) ,
      
        tags:new FormControl(),
        check:new FormControl()
        
    })



get title(){
return this.myform.get("email");
}

get price(){
return this.myform.get("Price");
}

get NOA(){
return this.myform.get("NOA");
}

get select(){
return this.myform.get("NOA");
}

get tags(){
return this.myform.get("tags");
}

get check(){
return this.myform.get("check");
}

subscription(subForm: FormGroup):void{
     console.log(subForm);



}



}
