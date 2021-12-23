import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AuthService } from '../auth/auth.service'
import { HomeComponent } from './home.component'
import { RouterTestingModule } from '@angular/router/testing'
import { createComponentMock } from 'angular-unit-test-helper'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, createComponentMock('LoginComponent')],
      imports: [RouterTestingModule],
      providers: [AuthService],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
  })

  it('should create a home page', () => {
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
