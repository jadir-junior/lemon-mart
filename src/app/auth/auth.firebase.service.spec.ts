import { AngularFireAuth } from '@angular/fire/compat/auth'
import { FirebaseAuthService } from './auth.firebase.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'

const angularFireStub = {
  user: jasmine.createSpyObj('user', ['subscribe']),
  auth: jasmine.createSpyObj('auth', ['signInWithEmailAndPassword', 'signOut']),
}

describe('FirebaseAuthService', () => {
  let service: FirebaseAuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FirebaseAuthService,
        { provide: AngularFireAuth, useValue: angularFireStub },
      ],
    })
    service = TestBed.inject(FirebaseAuthService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
