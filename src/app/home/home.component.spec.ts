import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AuthService } from '../auth/auth.service'
import { By } from '@angular/platform-browser'
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

  it('should show a login form if display login is true', () => {
    fixture.detectChanges()

    const loginComponent = fixture.debugElement.query(By.css('app-login'))

    expect(loginComponent).toBeTruthy()
  })

  it('should render a message if display login is false', () => {
    component.displayLogin = false
    fixture.detectChanges()

    const messageEl: HTMLElement = fixture.debugElement.query(
      By.css('span')
    ).nativeElement

    expect(messageEl.textContent).toBe(
      'You get a lemon, you get a lemon, you get a lemon...'
    )
  })
})
