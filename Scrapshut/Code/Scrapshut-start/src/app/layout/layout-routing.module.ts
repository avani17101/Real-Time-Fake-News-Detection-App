import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'twitter', loadChildren: './twitter/twitter.module#TwitterModule' },
            { path: 'instagram', loadChildren: './instagram/instagram.module#InstagramModule' },          
            { path: 'upgradeAccount', loadChildren: './upgradeAccount/upgradeAccount.module#UpgradeAccountModule' },
            { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' }
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
