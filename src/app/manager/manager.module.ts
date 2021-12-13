import { CommonModule } from '@angular/common'
import { ManagerHomeComponent } from './manager-home/manager-home.component'
import { ManagerRoutingModule } from './manager-routing.module'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [ManagerHomeComponent],
  imports: [CommonModule, ManagerRoutingModule],
})
export class ManagerModule {}
