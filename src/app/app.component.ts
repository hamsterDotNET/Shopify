import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shopify';

  constructor(private authSrvc: AuthenticationService){}

  ngOnInit(): void {
    this.authSrvc.autoLogin();
  }
}
