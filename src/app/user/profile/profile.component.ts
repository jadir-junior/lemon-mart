import { BehaviorSubject, Observable, filter, map, startWith, tap } from 'rxjs'
import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  EmailValidation,
  OptionalTextValidation,
  RequiredTextValidation,
  USAPhoneNumberValidation,
  USAZipCodeValidation,
} from 'src/app/common/validations'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { IName, IPhone, IUser, PhoneType } from '../user/user'
import { IUSState, USStateFilter } from './data'

import { $enum } from 'ts-enum-util'
import { AuthService } from 'src/app/auth/auth.service'
import { BaseFormDirective } from 'src/app/common/base-form.class'
import { ErrorSets } from 'src/app/user-controls/field-error/field-error.directive'
import { Role } from 'src/app/auth/auth.enum'
import { SubSink } from 'subsink'
import { UiService } from 'src/app/common/ui.service'
import { UserService } from '../user/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent
  extends BaseFormDirective<IUser>
  implements OnInit, OnDestroy
{
  readonly nameInitialData$ = new BehaviorSubject<IName>({
    first: '',
    middle: '',
    last: '',
  })
  Role = Role
  PhoneType = PhoneType
  PhoneTypes = $enum(PhoneType).getKeys()
  states$: Observable<IUSState[]> | undefined
  userError = ''

  now = new Date()
  minDate = new Date(
    this.now.getFullYear() - 100,
    this.now.getMonth(),
    this.now.getDate()
  )

  private subs = new SubSink()

  currentUserId!: string

  constructor(
    private formBuilder: FormBuilder,
    private uiService: UiService,
    private userService: UserService,
    private authService: AuthService
  ) {
    super()
  }

  ErrorSets = ErrorSets

  ngOnInit(): void {
    this.formGroup = this.buildForm()

    this.subs.sink = this.authService.currentUser$
      .pipe(
        filter((user) => user !== null),
        tap((user) => {
          this.currentUserId = user._id
          this.buildForm(user)
          this.patchUser(user)
          this.nameInitialData$.next(user.name)
        })
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
    this.deregisterAllForms()
  }

  private get currentUserRole() {
    return this.authService.authStatus$.value.userRole
  }

  buildForm(initialData?: IUser): FormGroup {
    const user = initialData
    const form = this.formBuilder.group({
      email: [
        { value: user?.email || '', disabled: this.currentUserRole !== Role.Manager },
        EmailValidation,
      ],
      name: null,
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
      level: [user?.level || 0, Validators.required],
    })

    this.states$ = form.get('address.state')?.valueChanges.pipe(
      startWith(''),
      map((value) => USStateFilter(value))
    )

    return form
  }

  get dateOfBirth() {
    return this.formGroup.get('dateOfBirth')?.value || this.now
  }

  get age() {
    return this.now.getFullYear() - this.dateOfBirth.getFullYear()
  }

  patchUser(user: IUser) {
    if (user) {
      this.currentUserId = user._id
      this.patchUpdatedData(user)
      this.nameInitialData$.next(user.name)
    }
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

  async save(form: FormGroup) {
    this.subs.add(
      this.userService.updateUser(this.currentUserId, form.value).subscribe({
        next: (res: IUser) => {
          this.formGroup.patchValue(res)
          this.uiService.showToast('Updated user')
        },
        error: (err: string) => (this.userError = err),
      })
    )
  }
}
