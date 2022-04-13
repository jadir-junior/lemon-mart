import { AuthService, defaultAuthStatus } from 'src/app/auth/auth.service'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  ObservablePropertyStrategy,
  autoSpyObj,
  injectSpy,
} from 'angular-unit-test-helper'
import {
  commonTestingModules,
  commonTestingProviders,
} from 'src/app/common/common.testing'

import { FieldErrorModule } from 'src/app/user-controls/field-error/field-error.module'
import { LemonRaterModule } from 'src/app/user-controls/lemon-rater/lemon-rater.module'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { NameInputComponent } from '../name-input/name-input.component'
import { ProfileComponent } from './profile.component'
import { User } from '../user/user'
import { UserMaterialModule } from '../user-material.module'
import { ViewUserComponent } from '../view-user/view-user.component'

describe('ProfileComponent', () => {
  let component: ProfileComponent
  let fixture: ComponentFixture<ProfileComponent>
  let authServiceMock: jasmine.SpyObj<AuthService>

  beforeEach(async () => {
    const authServiceSpy = autoSpyObj(
      AuthService,
      ['currentUser$', 'authStatus$'],
      ObservablePropertyStrategy.BehaviorSubject
    )

    await TestBed.configureTestingModule({
      imports: commonTestingModules.concat([
        UserMaterialModule,
        FieldErrorModule,
        LemonRaterModule,
      ]),
      declarations: [ProfileComponent, NameInputComponent, ViewUserComponent],
      providers: commonTestingProviders.concat({
        provide: AuthService,
        useValue: authServiceSpy,
      }),
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    authServiceMock = injectSpy(AuthService)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent)
    component = fixture.debugElement.componentInstance
  })

  it('should create', () => {
    authServiceMock.currentUser$.next(new User())
    authServiceMock.authStatus$.next(defaultAuthStatus)
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
