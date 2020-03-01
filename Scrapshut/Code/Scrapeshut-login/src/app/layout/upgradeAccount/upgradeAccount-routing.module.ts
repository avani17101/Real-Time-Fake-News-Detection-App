import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpgradeAccountComponent } from "./upgradeAccount.component";


const routes: Routes = [
    { path: '', component: UpgradeAccountComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UpgradeAccountRoutingModule { }
