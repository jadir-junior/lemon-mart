import { AuthService, defaultAuthStatus } from './auth/auth.service'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MediaObserverFake, commonTestingModules } from './common/common.testing'
import {
  ObservablePropertyStrategy,
  autoSpyObj,
  createComponentMock,
  injectSpy,
} from 'angular-unit-test-helper'

import { AppComponent } from './app.component'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'
import { Location } from '@angular/common'
import { MatSidenavContainer } from '@angular/material/sidenav'
import { MediaObserver } from '@angular/flex-layout'
import { RouterTestingModule } from '@angular/router/testing'

describe('AppComponent', () => {
  let app: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let location: Location
  let authServiceMock: jasmine.SpyObj<AuthService>

  beforeEach(async () => {
    const authServiceSpy = autoSpyObj(
      AuthService,
      ['authStatus$'],
      ObservablePropertyStrategy.BehaviorSubject
    )

    await TestBed.configureTestingModule({
      imports: [
        ...commonTestingModules,
        RouterTestingModule.withRoutes([
          { path: 'home', component: createComponentMock('HomeComponent') },
        ]),
      ],
      declarations: [AppComponent, createComponentMock('NavigationMenuComponent')],
      providers: [
        MatSidenavContainer,
        { provide: MediaObserver, useClass: MediaObserverFake },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents()

    location = injectSpy(Location)
    authServiceMock = injectSpy(AuthService)
    authServiceMock.authStatus$.next(defaultAuthStatus)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    app = fixture.componentInstance
  })

  it('should create the app', () => {
    fixture.detectChanges()
    expect(app).toBeTruthy()
  })

  it('should render a toolbar with a button "LemonMart" and when clicked should redirect to "/home"', async () => {
    fixture.detectChanges()
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

  it('should render without buttons if is not authenticated', () => {
    fixture.detectChanges()

    const buttonsEl: DebugElement[] = fixture.debugElement.queryAll(By.css('button'))

    expect(buttonsEl.length).toBe(0)
  })

  it('should opened sidebar is false when user is not authenticated', () => {
    fixture.detectChanges()

    expect(app.opened).toBe(false)
  })
})
