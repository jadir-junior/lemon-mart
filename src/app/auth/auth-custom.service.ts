import { AuthService, IAuthStatus, IServerAuthResponse } from './auth.service'
import { IUser, User } from '../user/user/user'
import { Observable, catchError, map } from 'rxjs'

import { $enum } from 'ts-enum-util'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Role } from './auth.enum'
import { environment } from 'src/environments/environment'
import { transformError } from '../common/common'

interface IJetToken {
  email: string
  role: string
  picture: string
  iat: number
  exp: number
  sub: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthCustomService extends AuthService {
  constructor(private httpClient: HttpClient) {
    super()
  }

  protected authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse> {
    return this.httpClient.post<IServerAuthResponse>(
      `${environment.baseUrl}/v1/auth/login`,
      { email, password }
    )
  }

  protected transformJwtToken(token: IJetToken): IAuthStatus {
    return {
      isAuthenticated: token.email ? true : false,
      userId: token.sub,
      userRole: $enum(Role).asValueOrDefault(token.role, Role.None),
      userEmail: token.email,
      userPicture: token.picture,
    } as IAuthStatus
  }

  protected getCurrentUser(): Observable<User> {
    return this.httpClient
      .get<IUser>(`${environment.baseUrl}/v1/auth/me`)
      .pipe(map(User.Build, catchError(transformError)))
  }
}
