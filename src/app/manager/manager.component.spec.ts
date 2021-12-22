import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'
import { Router, Routes } from '@angular/router'

import { By } from '@angular/platform-browser'
import { Location } from '@angular/common'
import { ManagerComponent } from './manager.component'
import { MaterialModule } from '../material.module'
import { RouterTestingModule } from '@angular/router/testing'
import { createComponentMock } from 'angular-unit-test-helper'

describe('ManagerComponent', () => {
  let component: ManagerComponent
  let fixture: ComponentFixture<ManagerComponent>
  let location: Location
  let router: Router

  const routes: Routes = [
    {
      path: 'manager',
      component: ManagerComponent,
      children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: createComponentMock('ManagerHomeComponent') },
        { path: 'users', component: createComponentMock('UserManagementComponent') },
        { path: 'receipts', component: createComponentMock('ReceiptLookupComponent') },
      ],
    },
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), MaterialModule],
      declarations: [ManagerComponent],
    }).compileComponents()

    location = TestBed.inject(Location)
    router = TestBed.inject(Router)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerComponent)
    component = fixture.componentInstance
    router.initialNavigation()
    fixture.detectChanges()
  })

  it('should create with links managers dashboard/user management/receipt lookup', () => {
    const AnchorManagerDashboard: HTMLAnchorElement = fixture.debugElement.queryAll(
      By.css('a')
    )[0].nativeElement
    const AnchorUserManagement: HTMLAnchorElement = fixture.debugElement.queryAll(
      By.css('a')
    )[1].nativeElement
    const AnchorReceiptLookup: HTMLAnchorElement = fixture.debugElement.queryAll(
      By.css('a')
    )[2].nativeElement
    const buttonInventory: HTMLButtonElement = fixture.debugElement.query(
      By.css('[aria-label="Inventory"]')
    ).nativeElement
    const buttonPOS: HTMLButtonElement = fixture.debugElement.query(
      By.css('[aria-label="POS"]')
    ).nativeElement

    expect(component).toBeTruthy()
    expect(buttonInventory).toBeTruthy()
    expect(buttonPOS).toBeTruthy()
    expect(AnchorManagerDashboard.textContent).toBe("Manager's Dashboard")
    expect(AnchorUserManagement.textContent).toBe('User Management')
    expect(AnchorReceiptLookup.textContent).toBe('Receipt Lookup')
  })

  it('should render a link active on Managers Dashbaord when initial state', fakeAsync(() => {
    const AnchorManagementDashboard: HTMLAnchorElement = fixture.debugElement.queryAll(
      By.css('a')
    )[0].nativeElement

    router.navigate(['manager'])
    tick()

    expect(location.path()).toBe('/manager/home')
    expect(AnchorManagementDashboard).toHaveClass('active-link')
  }))

  it('should render a link active on click in anchor Receipt Lookup', fakeAsync(() => {
    const AnchorManagementDashboard: HTMLAnchorElement = fixture.debugElement.queryAll(
      By.css('a')
    )[0].nativeElement
    const AnchorReceiptLookup: HTMLAnchorElement = fixture.debugElement.queryAll(
      By.css('a')
    )[2].nativeElement

    router.navigate(['manager'])
    tick()
    AnchorReceiptLookup.click()
    tick()

    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/manager/receipts')
      expect(AnchorManagementDashboard).not.toHaveClass('active-link')
      expect(AnchorReceiptLookup).toHaveClass('active-link')
    })
  }))
})
