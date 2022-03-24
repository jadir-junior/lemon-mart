import { AuthService } from 'src/app/auth/auth.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { UserService } from './user.service'

describe('UserService', () => {
  let service: UserService
  let authService: AuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    })
    service = TestBed.inject(UserService)
    authService = TestBed.inject(AuthService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
    expect(authService).toBeTruthy()
  })
})
