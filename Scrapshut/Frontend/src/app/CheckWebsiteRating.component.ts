import { Component } from '@angular/core';
import {AppService} from './service'
import { Router } from '@angular/router'
@Component({
  selector: 'CheckWebsiteRating',
  templateUrl: './CheckWebsiteRating.component.html',
  styleUrls: ['./CheckWebsiteRating.component.css']
})
export class CheckWebsiteRating {
  title = 'CheckWebsiteRating';
  constructor(private service: AppService, private router: Router) {}
}