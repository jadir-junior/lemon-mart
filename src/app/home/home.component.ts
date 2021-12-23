import { combineLatest, filter, tap } from 'rxjs'

import { AuthService } from '../auth/auth.service'
import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <span class="mat-display-2">Hello, Limoncu!</span>
      <button mat-raised-button color="primary" (click)="login()">
        Login as Manager
      </button>
    </div>
  `,
  styles: [
    `
      div[fxLayout] {
        margin-top: 32px;
      }
    `,
  ],
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login('manager@test.com', '12345678')

    combineLatest([this.authService.authStatus$, this.authService.currentUser$])
      .pipe(
        filter(([authStatus, user]) => authStatus.isAuthenticated && user?._id !== ''),
        tap(() => {
          this.router.navigate(['/manager'])
        })
      )
      .subscribe()
  }
}
