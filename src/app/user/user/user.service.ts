import { IUser, User } from './user'
import { Observable, catchError, map, throwError } from 'rxjs'

import { AuthService } from 'src/app/auth/auth.service'
import { CacheService } from 'src/app/auth/cache.service'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { transformError } from 'src/app/common/common'

export interface IUserService {
  getUsers(pageSize: number, searchText: string, pagesToSkip: number): Observable<IUsers>
  getUser(id: string): Observable<IUser>
  updateUser(id: string, user: IUser): Observable<IUser>
}

export interface IUsers {
  data: IUser[]
  total: number
}

@Injectable({
  providedIn: 'root',
})
export class UserService extends CacheService implements IUserService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {
    super()
  }

  getUsers(
    pageSize: number,
    searchText = '',
    pagesToSkip = 0,
    sortColumn = '',
    sortDirection: '' | 'asc' | 'desc' = 'asc'
  ): Observable<IUsers> {
    if (sortColumn) {
      sortColumn = sortDirection === 'desc' ? `-${sortColumn}` : sortColumn
    }

    return this.httpClient.get<IUsers>(`${environment.baseUrl}/v2/users`, {
      params: {
        filter: searchText,
        skip: pagesToSkip.toString(),
        limit: pageSize.toString(),
        sortKey: sortColumn,
      },
    })
  }

  getUser(id: string | null): Observable<IUser> {
    if (id === null) {
      return throwError(() => new Error('User id is not set'))
    }

    return this.httpClient.get<IUser>(`${environment.baseUrl}/v2/user/${id}`)
  }

  updateUser(id: string, user: IUser): Observable<IUser> {
    if (id === '') {
      return throwError(() => new Error('User id is not set'))
    }

    // cache user data in case of errors
    this.setItem('draft-user', Object.assign(user, { _id: id }))
    const updateResponse$ = this.httpClient
      .put<IUser>(`${environment.baseUrl}/v2/user/${id}`, user)
      .pipe(map(User.Build, catchError(transformError)))

    updateResponse$.subscribe({
      next: (res) => {
        this.authService.currentUser$.next(res)
        this.removeItem('draft-user')
      },
      error: (error) => throwError(() => new Error(error)),
    })

    return updateResponse$
  }
}
