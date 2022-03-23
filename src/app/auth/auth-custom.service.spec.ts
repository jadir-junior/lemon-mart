import { AuthCustomService } from './auth-custom.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

describe('AuthCustomService', () => {
  let service: AuthCustomService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    service = TestBed.inject(AuthCustomService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
