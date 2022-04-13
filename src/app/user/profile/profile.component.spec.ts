import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AppMaterialModule } from '../../app-material.module'
import { AuthService } from 'src/app/auth/auth.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { LemonRaterComponent } from 'src/app/user-controls/lemon-rater/lemon-rater.component'
import { MockComponent } from 'ng-mocks'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ProfileComponent } from './profile.component'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { UserMaterialModule } from '../user-material.module'

describe('ProfileComponent', () => {
  let component: ProfileComponent
  let fixture: ComponentFixture<ProfileComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AppMaterialModule,
        HttpClientTestingModule,
        UserMaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      declarations: [ProfileComponent, MockComponent(LemonRaterComponent)],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
