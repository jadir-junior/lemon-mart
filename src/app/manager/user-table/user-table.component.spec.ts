import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AuthService } from 'src/app/auth/auth.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ManagerMaterialModule } from '../manager-material.module'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { User } from 'src/app/user/user/user'
import { UserTableComponent } from './user-table.component'
import { of } from 'rxjs'

describe('UserTableComponent', () => {
  let component: UserTableComponent
  let fixture: ComponentFixture<UserTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTableComponent],
      imports: [HttpClientTestingModule, ManagerMaterialModule, NoopAnimationsModule],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableComponent)
    component = fixture.componentInstance
    component.items$ = of([new User()])
    Object.assign(component, { skipLoading: true })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
