import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { EmailValidation, PasswordValidation } from '../common/validations'
import { FormBuilder, FormGroup } from '@angular/forms'
import { catchError, combineLatest, filter, tap } from 'rxjs'

import { AuthService } from '../auth/auth.service'
import { ErrorSets } from '../user-controls/field-error/field-error.directive'
import { Role } from '../auth/auth.enum'
import { SubSink } from 'subsink'
import { UiService } from '../common/ui.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      .error {
        color: red;
      }
    `,
    `
      div[fxLayout] {
        margin-top: 32px;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  private subs = new SubSink()
  loginForm!: FormGroup
  loginError = ''
  redirectUrl!: string
  roles = Object.keys(Role)

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UiService
  ) {
    this.subs.sink = this.route.paramMap.subscribe(
      (params) => (this.redirectUrl = params.get('redirectUrl') ?? '')
    )
  }

  ErrorSets = ErrorSets

  ngOnInit(): void {
    this.authService.logout()
    this.buildLoginForm()
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
    })
  }

  async login(submittedForm: FormGroup) {
    this.authService
      .login(submittedForm.value.email, submittedForm.value.password)
      .pipe(catchError((err) => (this.loginError = err)))

    this.subs.sink = combineLatest([
      this.authService.authStatus$,
      this.authService.currentUser$,
    ])
      .pipe(
        filter(([authStatus, user]) => authStatus.isAuthenticated && user?._id !== ''),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tap(([authStatus, user]) => {
          this.uiService.showToast(`Welcome ${user.fullName}! Role: ${user.role}`)
          this.router.navigate([
            this.redirectUrl || this.homeRoutePerRole(user.role as Role),
          ])
        })
      )
      .subscribe()
  }

  private homeRoutePerRole(role: Role) {
    switch (role) {
      case Role.Cashier:
        return '/pos'
      case Role.Clerk:
        return '/inventory'
      case Role.Manager:
        return '/manager'
      default:
        return '/user/profile'
    }
  }
}
