import { AppMaterialModule } from '../app-material.module'
import { TestBed } from '@angular/core/testing'
import { UiService } from './ui.service'

describe('UiService', () => {
  let service: UiService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule],
    })
    service = TestBed.inject(UiService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
