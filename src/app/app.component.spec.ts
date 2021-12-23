import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AppComponent } from './app.component'
import { AuthService } from './auth/auth.service'
import { By } from '@angular/platform-browser'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { Location } from '@angular/common'
import { MaterialModule } from './material.module'
import { RouterTestingModule } from '@angular/router/testing'
import { createComponentMock } from 'angular-unit-test-helper'

describe('AppComponent', () => {
  let app: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let location: Location

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: createComponentMock('HomeComponent') },
        ]),
      ],
      declarations: [AppComponent],
      providers: [AuthService],
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
    const titleLinkEl: HTMLAnchorElement = fixture.debugElement.query(
      By.css('a')
    ).nativeElement

    // Act
    titleLinkEl.click()

    // Assert
    expect(titleLinkEl.textContent).toBe('LemonMart')
    expect(titleLinkEl.href).toContain('/home')
    await fixture.whenStable().then(() => {
      expect(location.path()).toBe('/home')
    })
  })
})
