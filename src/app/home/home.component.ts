import { combineLatest, filter, tap } from 'rxjs'

import { AuthService } from '../auth/auth.service'
import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  template: `
    <div *ngIf="displayLogin">
      <app-login></app-login>
    </div>
    <div *ngIf="!displayLogin">
      <span class="mat-display-3"
        >You get a lemon, you get a lemon, you get a lemon...</span
      >
    </div>
  `,
})
export class HomeComponent {
  displayLogin = true
}
