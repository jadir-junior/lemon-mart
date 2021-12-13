import { ComponentFixture, TestBed } from '@angular/core/testing'

import { By } from '@angular/platform-browser'
import { Location } from '@angular/common'
import { PageNotFoundComponent } from './page-not-found.component'
import { RouterTestingModule } from '@angular/router/testing'
import { createComponentMock } from 'angular-unit-test-helper'

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent
  let fixture: ComponentFixture<PageNotFoundComponent>
  let location: Location

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: createComponentMock('HomeComponent') },
        ]),
      ],
    }).compileComponents()

    location = TestBed.inject(Location)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create component page not found', () => {
    expect(component).toBeTruthy()
  })

  it('should when clicked on home link redirect to route "/home"', async () => {
    // Arrenge
    const linkEl: HTMLLinkElement = fixture.debugElement.query(By.css('a')).nativeElement

    // Act
    linkEl.click()

    // Assert
    await fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/home')
    })
  })
})
