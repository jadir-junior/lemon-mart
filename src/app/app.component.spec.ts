import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AppComponent } from './app.component'
import { By } from '@angular/platform-browser'
import { Location } from '@angular/common'
import { RouterTestingModule } from '@angular/router/testing'
import { createComponentMock } from 'angular-unit-test-helper'

describe('AppComponent', () => {
  let app: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let location: Location

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: createComponentMock('HomeComponent') },
        ]),
      ],
      declarations: [AppComponent],
    }).compileComponents()

    location = TestBed.inject(Location)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    app = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the app', () => {
    expect(app).toBeTruthy()
  })

  it('should render a toolbar with a button "LemonMart" and when clicked should redirect to "/home"', async () => {
    // Arrenge
    const titleAppEl: HTMLElement = fixture.debugElement.query(By.css('h1')).nativeElement
    const titleLinkEl: HTMLLinkElement = fixture.debugElement.query(
      By.css('a')
    ).nativeElement

    // Act
    titleLinkEl.click()

    // Assert
    expect(titleAppEl.textContent).toBe('LemonMart')
    await fixture.whenStable().then(() => {
      expect(location.path()).toBe('/home')
    })
  })
})
