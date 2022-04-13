import { ActivatedRouteSnapshot, Resolve } from '@angular/router'
import { IUser, User } from './user'
import { catchError, map } from 'rxjs'

import { Injectable } from '@angular/core'
import { UserService } from './user.service'
import { transformError } from 'src/app/common/common'

@Injectable()
export class UserResolve implements Resolve<IUser> {
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.userService
      .getUser(route.paramMap.get('userId'))
      .pipe(map(User.Build), catchError(transformError))
  }
}
