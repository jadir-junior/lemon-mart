import { AuthCustomService } from './auth-custom.service'
import { TestBed } from '@angular/core/testing'

describe('AuthCustomService', () => {
  let service: AuthCustomService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(AuthCustomService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
