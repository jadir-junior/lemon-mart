import { MatLineModule, MatNativeDateModule } from '@angular/material/core'

import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDividerModule } from '@angular/material/divider'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatStepperModule } from '@angular/material/stepper'
import { NgModule } from '@angular/core'

const modules = [
  MatAutocompleteModule,
  MatDatepickerModule,
  MatDividerModule,
  MatRadioModule,
  MatLineModule,
  MatNativeDateModule,
  MatSelectModule,
  MatStepperModule,
]

@NgModule({
  exports: modules,
})
export class UserMaterialModule {}
