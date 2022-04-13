import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { NgModule } from '@angular/core'

const modules = [
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule,
]
@NgModule({
  exports: modules,
})
export class ManagerMaterialModule {}
