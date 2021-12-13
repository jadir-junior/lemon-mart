import { RouterModule, Routes } from '@angular/router'

import { ManagerHomeComponent } from './manager-home/manager-home.component'
import { NgModule } from '@angular/core'

const routes: Routes = [
  { path: '', redirectTo: '/manager/home', pathMatch: 'full' },
  { path: 'home', component: ManagerHomeComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
