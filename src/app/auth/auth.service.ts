import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  map,
  mergeMap,
  pipe,
  tap,
  throwError,
} from 'rxjs'
import { IUser, User } from '../user/user/user'

import { CacheService } from './cache.service'
import { Injectable } from '@angular/core'
import { Role } from './auth.enum'
import jwt_decode from 'jwt-decode'
import { transformError } from '../common/common'

export interface IAuthStatus {
  isAuthenticated: boolean
  userRole: Role
  userId: string
}

export interface IServerAuthResponse {
  accessToken: string
}

export const defaultAuthStatus: IAuthStatus = {
  isAuthenticated: false,
  userRole: Role.None,
  userId: '',
}

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>
  readonly currentUser$: BehaviorSubject<IUser>
  login(email: string, password: string): Observable<void>
  logout(clearToken?: boolean): void
  getToken(): string
}
@Injectable({
  providedIn: null,
})
export abstract class AuthService extends CacheService implements IAuthService {
  private getAndUpdateUserIfAuthenticated = pipe(
    filter((status: IAuthStatus) => status.isAuthenticated),
    mergeMap(() => this.getCurrentUser()),
    map((user: IUser) => this.currentUser$.next(user)),
    catchError(transformError)
  )
  readonly authStatus$: BehaviorSubject<IAuthStatus> = new BehaviorSubject<IAuthStatus>(
    this.getItem('authStatus') ?? defaultAuthStatus
  )
  readonly currentUser$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(new User())
  protected readonly resumeCurrentUser$ = this.authStatus$.pipe(
    this.getAndUpdateUserIfAuthenticated
  )

  constructor() {
    super()
    if (this.hasExpiredToken()) {
      this.logout(true)
    } else {
      this.authStatus$.next(this.getAuthStatusFromToken())
      // To load user on broweser refresh,
      // resume pipeline must activate on the next cycle
      // Which allows for all services to constructed properlu
      setTimeout(() => this.resumeCurrentUser$.subscribe(), 0)
    }
  }

  login(email: string, password: string): Observable<void> {
    this.clearToken()

    const loginResponse$ = this.authProvider(email, password).pipe(
      map((value) => {
        this.setToken(value.accessToken)
        const token = jwt_decode(value.accessToken)
        return this.transformJwtToken(token)
      }),
      tap((status) => this.authStatus$.next(status)),
      this.getAndUpdateUserIfAuthenticated
    )

    loginResponse$.subscribe({
      error: (err) => {
        this.logout()
        return throwError(err)
      },
    })

    return loginResponse$
  }

  logout(clearToken?: boolean): void {
    if (clearToken) {
      this.clearToken()
    }
    setTimeout(() => this.authStatus$.next(defaultAuthStatus), 0)
  }

  getToken(): string {
    return this.getItem('jwt') ?? ''
  }

  protected abstract authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse>

  protected abstract transformJwtToken(token: unknown): IAuthStatus

  protected abstract getCurrentUser(): Observable<User>

  protected setToken(jwt: string) {
    this.setItem('jwt', jwt)
  }

  protected clearToken() {
    this.removeItem('jwt')
  }

  protected hasExpiredToken(): boolean {
    const jwt = this.getToken()

    if (jwt) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload = jwt_decode(jwt) as any
      return Date.now() >= payload.exp * 1000
    }

    return true
  }

  protected getAuthStatusFromToken(): IAuthStatus {
    return this.transformJwtToken(jwt_decode(this.getToken()))
  }
}
