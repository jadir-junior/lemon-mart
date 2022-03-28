import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AppMaterialModule } from '../../app-material.module'
import { AuthService } from 'src/app/auth/auth.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ProfileComponent } from './profile.component'
import { ReactiveFormsModule } from '@angular/forms'
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
      ],
      declarations: [ProfileComponent],
      providers: [AuthService],
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
