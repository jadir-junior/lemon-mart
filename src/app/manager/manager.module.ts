import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppMaterialModule } from '../app-material.module'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ManagerComponent } from './manager.component'
import { ManagerHomeComponent } from './manager-home/manager-home.component'
import { ManagerMaterialModule } from './manager-material.module'
import { ManagerRoutingModule } from './manager-routing.module'
import { NgModule } from '@angular/core'
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component'
import { SharedComponentsModule } from '../shared-components.module'
import { UserManagementComponent } from './user-management/user-management.component'
import { UserResolve } from '../user/user/user.resolve'
import { UserTableComponent } from './user-table/user-table.component'

@NgModule({
  declarations: [
    ManagerHomeComponent,
    ManagerComponent,
    UserManagementComponent,
    ReceiptLookupComponent,
    UserTableComponent,
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    AppMaterialModule,
    FlexLayoutModule,
    SharedComponentsModule,
    ManagerMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UserResolve],
})
export class ManagerModule {}
