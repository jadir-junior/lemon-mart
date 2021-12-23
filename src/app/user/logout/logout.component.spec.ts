import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AuthService } from 'src/app/auth/auth.service'
import { LogoutComponent } from './logout.component'
import { RouterTestingModule } from '@angular/router/testing'

describe('LogoutComponent', () => {
  let component: LogoutComponent
  let fixture: ComponentFixture<LogoutComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoutComponent],
      imports: [RouterTestingModule],
      providers: [AuthService],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
