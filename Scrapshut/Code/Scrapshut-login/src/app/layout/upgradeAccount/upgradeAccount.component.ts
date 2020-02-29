import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-upgradeAccount',
    templateUrl: './upgradeAccount.component.html',
    styleUrls: ['./upgradeAccount.component.scss'],
    animations: [routerTransition()]
})
export class UpgradeAccountComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}
