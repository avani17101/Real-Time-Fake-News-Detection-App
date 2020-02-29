import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';
import { TwitterComponent } from "./twitter.component";
import { TwitterRoutingModule } from "./twitter-routing.module";

@NgModule({
    imports: [
        CommonModule,
        TwitterRoutingModule,
        PageHeaderModule
    ],
    declarations: [TwitterComponent]
})
export class TwitterModule { }
