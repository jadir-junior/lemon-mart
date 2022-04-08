import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { OneCharValidation, RequiredTextValidation } from 'src/app/common/validations'

import { BaseFormDirective } from 'src/app/common/base-form.class'
import { ErrorSets } from 'src/app/user-controls/field-error/field-error.directive'
import { IName } from '../user/user'

@Component({
  selector: 'app-name-input',
  template: `
    <form [formGroup]="formGroup">
      <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="10px">
        <mat-form-field appearance="outline" fxFlex="40%">
          <input
            matInput
            placeholder="First Name"
            aria-label="First Name"
            formControlName="first"
            #name
          />
          <mat-error
            [input]="name"
            [group]="formGroup"
            [appFieldError]="ErrorSets['RequiredText']"
          ></mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" fxFlex="20%">
          <input
            matInput
            placeholder="MI"
            aria-label="Middle Initial"
            formControlName="middle"
            #middle
          />
          <mat-error
            [input]="middle"
            [group]="formGroup"
            [appFieldError]="{ error: 'invalid', message: 'Only initial' }"
          ></mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" fxFlex="40%">
          <input
            matInput
            placeholder="Last Name"
            aria-label="Last Name"
            formControlName="last"
            #last
          />
          <mat-error
            [input]="last"
            [group]="formGroup"
            [appFieldError]="ErrorSets['RequiredText']"
          ></mat-error>
        </mat-form-field>
      </div>
    </form>
  `,
})
export class NameInputComponent
  extends BaseFormDirective<IName>
  implements OnInit, OnChanges
{
  ErrorSets = ErrorSets

  constructor(private formBuilder: FormBuilder) {
    super()
  }

  ngOnInit(): void {
    this.formGroup = this.buildForm(this.initialData)

    if (this.disable) {
      this.formGroup.disable()
    }

    this.formReady.emit(this.formGroup)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.patchUpdatedDataIfChanged(changes)
  }

  buildForm(initialData?: IName | null): FormGroup {
    const name = initialData
    return this.formBuilder.group({
      first: [name?.first || '', RequiredTextValidation],
      middle: [name?.middle || '', OneCharValidation],
      last: [name?.last || '', RequiredTextValidation],
    })
  }
}
