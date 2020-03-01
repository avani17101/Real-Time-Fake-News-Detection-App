import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-twitter',
    templateUrl: './twitter.component.html',
    styleUrls: ['./twitter.component.scss'],
    animations: [routerTransition()]
})
export class TwitterComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}
