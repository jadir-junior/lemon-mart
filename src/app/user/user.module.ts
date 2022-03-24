import { AppMaterialModule } from '../app-material.module'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { LogoutComponent } from './logout/logout.component'
import { NgModule } from '@angular/core'
import { ProfileComponent } from './profile/profile.component'
import { ReactiveFormsModule } from '@angular/forms'
import { UserMaterialModule } from './user-material.module'
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
  ],
})
export class UserModule {}
