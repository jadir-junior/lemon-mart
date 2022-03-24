import { Component, OnInit } from '@angular/core'
import {
  EmailValidation,
  OneCharValidation,
  OptionalTextValidation,
  RequiredTextValidation,
  USAZipCodeValidation,
} from 'src/app/common/validations'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { IUser, PhoneType } from '../user/user'
import { Observable, filter, tap } from 'rxjs'

import { $enum } from 'ts-enum-util'
import { AuthService } from 'src/app/auth/auth.service'
import { ErrorSets } from 'src/app/user-controls/field-error/field-error.directive'
import { IUSState } from './data'
import { Role } from 'src/app/auth/auth.enum'
import { UiService } from 'src/app/common/ui.service'
import { UserService } from '../user/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  Role = Role
  PhoneType = PhoneType
  PhoneTypes = $enum(PhoneType).getKeys()
  formGroup!: FormGroup
  states$: Observable<IUSState[]> | undefined
  userError = ''

  currentUserId: string | undefined

  constructor(
    private formBuilder: FormBuilder,
    private uiService: UiService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ErrorSets = ErrorSets

  ngOnInit(): void {
    this.buildForm()
    this.authService.currentUser$
      .pipe(
        filter((user) => user !== null),
        tap((user) => {
          this.currentUserId = user._id
          this.buildForm(user)
        })
      )
      .subscribe()
  }

  private get currentUserRole() {
    return this.authService.authStatus$.value.userRole
  }

  private buildForm(user?: IUser) {
    this.formGroup = this.formBuilder.group({
      email: [
        { value: user?.email || '', disabled: this.currentUserRole !== Role.Manager },
        EmailValidation,
      ],
      name: this.formBuilder.group({
        first: [user?.name?.first || '', RequiredTextValidation],
        middle: [user?.name?.middle || '', OneCharValidation],
        last: [user?.name?.last || '', RequiredTextValidation],
      }),
      role: [
        {
          value: user?.role || '',
          disabled: this.currentUserRole !== Role.Manager,
        },
        [Validators.required],
      ],
      dateOfBirth: [user?.dateOfBirth || '', Validators.required],
      address: this.formBuilder.group({
        line1: [user?.address?.line1 || '', RequiredTextValidation],
        line2: [user?.address?.line2 || '', OptionalTextValidation],
        city: [user?.address?.state || '', RequiredTextValidation],
        zip: [user?.address?.zip || '', USAZipCodeValidation],
      }),
    })
  }

  formGroupName(): FormGroup {
    return this.formGroup.get('name') as FormGroup
  }
}
