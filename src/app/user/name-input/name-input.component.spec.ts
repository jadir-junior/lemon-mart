import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { NO_ERRORS_SCHEMA } from '@angular/core'
import { NameInputComponent } from './name-input.component'

describe('NameInputComponent', () => {
  let component: NameInputComponent
  let fixture: ComponentFixture<NameInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NameInputComponent],
      imports: [ReactiveFormsModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NameInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
