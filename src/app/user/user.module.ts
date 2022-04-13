import { AppMaterialModule } from '../app-material.module'
import { CommonModule } from '@angular/common'
import { FieldErrorModule } from '../user-controls/field-error/field-error.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { LemonRaterModule } from '../user-controls/lemon-rater/lemon-rater.module'
import { LogoutComponent } from './logout/logout.component'
import { NgModule } from '@angular/core'
import { NgxMaskModule } from 'ngx-mask'
import { ProfileComponent } from './profile/profile.component'
import { ReactiveFormsModule } from '@angular/forms'
import { SharedComponentsModule } from '../shared-components.module'
import { UserMaterialModule } from './user-material.module'
import { UserResolve } from './user/user.resolve'
import { UserRoutingModule } from './user-routing.module'

@NgModule({
  declarations: [ProfileComponent, LogoutComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    UserMaterialModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FieldErrorModule,
    NgxMaskModule.forChild(),
    LemonRaterModule,
    SharedComponentsModule,
  ],
  providers: [UserResolve],
})
export class UserModule {}
