import { CommonModule } from '@angular/common'
import { FieldErrorDirective } from './field-error.directive'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [FieldErrorDirective],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FieldErrorDirective],
})
export class FieldErrorModule {}
