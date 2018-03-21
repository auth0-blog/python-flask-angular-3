import {Component, OnInit} from '@angular/core';
import * as Auth0 from 'auth0-web';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z5">
      <button mat-button>Online Exams</button>
      <button mat-button>About</button>
    
      <!-- This fills the remaining space of the current row -->
      <span class="fill-remaining-space"></span>
    
      <button mat-button (click)="signIn()" *ngIf="!authenticated">Sign In</button>
      <button mat-button (click)="signOut()" *ngIf="authenticated">Sign Out</button>
    </mat-toolbar>
    
    <div class="view-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authenticated = false;

  signIn = Auth0.signIn;
  signOut = Auth0.signOut;

  ngOnInit() {
    const self = this;
    Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
  }
}
