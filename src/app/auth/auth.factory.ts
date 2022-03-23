import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AuthCustomService } from './auth-custom.service'
import { AuthMode } from './auth.enum'
import { FirebaseAuthService } from './auth.firebase.service'
import { HttpClient } from '@angular/common/http'
import { InMemoryAuthService } from './auth.inmemory.service'
import { environment } from 'src/environments/environment'

export function authFactory(afAuth: AngularFireAuth, httpClient: HttpClient) {
  switch (environment.authMode) {
    case AuthMode.InMemory:
      return new InMemoryAuthService()
    case AuthMode.Firebase:
      return new FirebaseAuthService(afAuth)
    case AuthMode.CustomServer:
      return new AuthCustomService(httpClient)
  }
}
