import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LemonRaterComponent } from './lemon-rater.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('LemonRaterComponent', () => {
  let component: LemonRaterComponent
  let fixture: ComponentFixture<LemonRaterComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LemonRaterComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LemonRaterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
