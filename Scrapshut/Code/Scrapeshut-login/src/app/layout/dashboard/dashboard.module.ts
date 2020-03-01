import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbCarouselModule,NgbAlertModule,NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {TimelineComponent,NotificationComponent,ChatComponent} from './components';
import { StatModule } from '../../shared';
import { ModalComponent } from "./modal/modal.component";
import { SubPlanComponent } from "./subPlan/subPlan.component";

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        DashboardRoutingModule,
        StatModule,
      
    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent,
        ModalComponent
        
    ]
})
export class DashboardModule { }
