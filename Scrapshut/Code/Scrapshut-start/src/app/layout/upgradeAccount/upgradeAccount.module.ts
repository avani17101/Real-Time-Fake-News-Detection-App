import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';
import { UpgradeAccountComponent } from "./upgradeAccount.component";
import { UpgradeAccountRoutingModule } from "./upgradeAccount-routing.module";


@NgModule({
    imports: [
        CommonModule,
        UpgradeAccountRoutingModule,
        PageHeaderModule
    ],
    declarations: [UpgradeAccountComponent]
})
export class UpgradeAccountModule { }
