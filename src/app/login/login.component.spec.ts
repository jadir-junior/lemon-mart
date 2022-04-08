import { ComponentFixture, TestBed } from '@angular/core/testing'
import { commonTestingModules, commonTestingProviders } from '../common/common.testing'

import { LoginComponent } from './login.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: commonTestingModules,
      providers: commonTestingProviders,
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
