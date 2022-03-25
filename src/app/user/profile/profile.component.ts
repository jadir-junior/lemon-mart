import { Component, OnInit } from '@angular/core'
import {
  EmailValidation,
  OneCharValidation,
  OptionalTextValidation,
  RequiredTextValidation,
  USAPhoneNumberValidation,
  USAZipCodeValidation,
} from 'src/app/common/validations'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { IPhone, IUser, PhoneType } from '../user/user'
import { IUSState, USStateFilter } from './data'
import { Observable, filter, map, startWith, tap } from 'rxjs'

import { $enum } from 'ts-enum-util'
import { AuthService } from 'src/app/auth/auth.service'
import { ErrorSets } from 'src/app/user-controls/field-error/field-error.directive'
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

  now = new Date()
  minDate = new Date(
    this.now.getFullYear() - 100,
    this.now.getMonth(),
    this.now.getDate()
  )

  currentUserId: string | undefined

  constructor(
    private formBuilder: FormBuilder,
    private uiService: UiService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ErrorSets = ErrorSets

  ngOnInit(): void {
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
        city: [user?.address?.city || '', RequiredTextValidation],
        state: [user?.address?.state || '', RequiredTextValidation],
        zip: [user?.address?.zip || '', USAZipCodeValidation],
      }),
      phones: this.formBuilder.array(this.buildPhoneArray(user?.phones || [])),
    })

    const state = this.formGroup.get('address.state')
    if (state !== null) {
      this.states$ = state.valueChanges.pipe(
        startWith(''),
        map((value) => USStateFilter(value))
      )
    }
  }

  get dateOfBirth() {
    return this.formGroup.get('dateOfBirth')?.value || this.now
  }

  get age() {
    return this.now.getFullYear() - this.dateOfBirth.getFullYear()
  }

  formGroupName(): FormGroup {
    return this.formGroup?.get('name') as FormGroup
  }

  formGroupAddress(): FormGroup {
    return this.formGroup.get('address') as FormGroup
  }

  private buildPhoneArray(phones: IPhone[]) {
    const groups = []

    if (phones?.length === 0) {
      groups.push(this.buildPhoneFormControl(1))
    } else {
      phones.forEach((p) => {
        groups.push(this.buildPhoneFormControl(p.id, p.type, p.digits))
      })
    }

    return groups
  }

  private buildPhoneFormControl(id: number, type?: string, phoneNumber?: string) {
    return this.formBuilder.group({
      id: [id],
      type: [type || '', Validators.required],
      digits: [phoneNumber || '', USAPhoneNumberValidation],
    })
  }

  addPhone() {
    this.phonesArray.push(
      this.buildPhoneFormControl(this.formGroup.get('phones')?.value.length + 1)
    )
  }

  get phonesArray(): FormArray {
    return this.formGroup.get('phones') as FormArray
  }

  convertTypeToPhoneType(type: string): PhoneType {
    return PhoneType[$enum(PhoneType).asKeyOrThrow(type)]
  }
}
