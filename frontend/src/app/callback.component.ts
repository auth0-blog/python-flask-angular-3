import * as Auth0 from 'auth0-web';
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'callback',
  template: `
    <div>Loading authentication details...</div>
  `,
})
export class CallbackComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
    const self = this;
    Auth0.handleAuthCallback((err) => {
      if (err) alert(err);
      self.router.navigate(['/']);
    });
  }
}
