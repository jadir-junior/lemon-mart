import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AuthService } from '../auth/auth.service'
import { By } from '@angular/platform-browser'
import { HomeComponent } from './home.component'
import { RouterTestingModule } from '@angular/router/testing'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule],
      providers: [AuthService],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create with title "Hello, Limoncu!" and a button with name "Login as Manager"', () => {
    const titleEl: HTMLElement = fixture.debugElement.query(By.css('span')).nativeElement
    const loginButtonEl: HTMLButtonElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement

    expect(component).toBeTruthy()
    expect(titleEl.textContent).toBe('Hello, Limoncu!')
    expect(loginButtonEl.textContent?.trim()).toBe('Login as Manager')
  })
})
