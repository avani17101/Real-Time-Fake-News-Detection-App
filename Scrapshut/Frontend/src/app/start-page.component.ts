import { Component } from '@angular/core';
import {AppService} from './service'
import { Router } from '@angular/router'

@Component({
  selector: 'start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})

export class StartPage {
  title = 'StartPage';
  constructor(private service: AppService, private router: Router) {}
}