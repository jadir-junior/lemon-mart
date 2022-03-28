import { AppMaterialModule } from '../app-material.module'
import { CommonModule } from '@angular/common'
import { FieldErrorModule } from '../user-controls/field-error/field-error.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { LogoutComponent } from './logout/logout.component'
import { NgModule } from '@angular/core'
import { ProfileComponent } from './profile/profile.component'
import { ReactiveFormsModule } from '@angular/forms'
import { UserMaterialModule } from './user-material.module'
import { UserRoutingModule } from './user-routing.module'
import { ViewUserComponent } from './view-user/view-user.component'

@NgModule({
  declarations: [ProfileComponent, LogoutComponent, ViewUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    UserMaterialModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FieldErrorModule,
  ],
})
export class UserModule {}
