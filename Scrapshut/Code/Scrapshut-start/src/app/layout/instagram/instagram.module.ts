import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';
import { InstagramComponent } from "./instagram.component";
import { InstagramRoutingModule } from "./instagram-routing.module";


@NgModule({
    imports: [
        CommonModule,
        InstagramRoutingModule,
        PageHeaderModule
    ],
    declarations: [InstagramComponent]
})
export class InstagramModule { }
