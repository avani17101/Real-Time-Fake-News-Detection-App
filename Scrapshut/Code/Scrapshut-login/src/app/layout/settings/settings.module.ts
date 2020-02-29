import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';
import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";


@NgModule({
    imports: [
        CommonModule,
        SettingsRoutingModule,
        PageHeaderModule
    ],
    declarations: [SettingsComponent]
})
export class SettingsModule { }
