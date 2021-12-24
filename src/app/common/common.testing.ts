/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Observable, Subscription, of } from 'rxjs'

import { AuthService } from '../auth/auth.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MaterialModule } from '../material.module'
import { MediaChange } from '@angular/flex-layout'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { UiService } from './ui.service'
import { autoSpyObj } from 'angular-unit-test-helper'

export class MediaObserverFake {
  isActive(query: string): boolean {
    return false
  }

  asObservable(): Observable<MediaChange> {
    return of({} as MediaChange)
  }

  subscribe(
    next?: (value: MediaChange) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription {
    return new Subscription()
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const commonTestingProviders: any[] = [
  { provide: AuthService, useValue: autoSpyObj(AuthService) },
  { provide: UiService, useValue: autoSpyObj(UiService) },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const commonTestingModules: any[] = [
  MaterialModule,
  NoopAnimationsModule,
  HttpClientTestingModule,
  RouterTestingModule,
  ReactiveFormsModule,
]
