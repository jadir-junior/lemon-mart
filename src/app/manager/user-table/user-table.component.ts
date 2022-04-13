import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core'
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  debounceTime,
  map,
  merge,
  of,
  startWith,
  switchMap,
} from 'rxjs'
import { IUsers, UserService } from 'src/app/user/user/user.service'
import { MatSort, SortDirection } from '@angular/material/sort'

import { FormControl } from '@angular/forms'
import { IUser } from 'src/app/user/user/user'
import { MatPaginator } from '@angular/material/paginator'
import { OptionalTextValidation } from 'src/app/common/validations'
import { SubSink } from 'subsink'

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnDestroy, AfterViewInit {
  displayedColumns = ['name', 'email', 'role', '_id']
  items$!: Observable<IUser[]>
  resultsLength = 0
  hasError = false
  errorText = ''
  private skipLoading = false
  private subs = new SubSink()
  readonly isLoadingRestuls$ = new BehaviorSubject(true)
  loading$: Observable<boolean>
  refresh$ = new Subject<void>()

  search = new FormControl('', OptionalTextValidation)

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: false }) sort!: MatSort

  constructor(private userService: UserService) {
    this.loading$ = this.isLoadingRestuls$
  }

  getUsers(
    pageSize: number,
    searchText: string,
    pagesToSkip: number,
    sortColumn: string,
    sortDirection: SortDirection
  ): Observable<IUsers> {
    return this.userService.getUsers(
      pageSize,
      searchText,
      pagesToSkip,
      sortColumn,
      sortDirection
    )
  }

  ngAfterViewInit(): void {
    this.subs.sink = this.sort.sortChange.subscribe(() => this.paginator.firstPage())

    if (this.skipLoading) {
      return
    }

    this.items$ = merge(
      this.refresh$,
      this.sort.sortChange,
      this.paginator.page,
      this.search.valueChanges.pipe(debounceTime(1000))
    ).pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingRestuls$.next(true)
        return this.getUsers(
          this.paginator.pageSize,
          this.search.value,
          this.paginator.pageIndex,
          this.sort.active,
          this.sort.direction
        )
      }),
      map((results: { total: number; data: IUser[] }) => {
        this.isLoadingRestuls$.next(false)
        this.hasError = false
        this.resultsLength = results.total

        return results.data
      }),
      catchError((error) => {
        this.isLoadingRestuls$.next(false)
        this.hasError = true
        this.errorText = error
        return of([])
      })
    )

    this.items$.subscribe()
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
