import { CommonModule } from '@angular/common'
import { LogoutComponent } from './logout/logout.component'
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component'
import { NgModule } from '@angular/core'
import { ProfileComponent } from './profile/profile.component'
import { UserRoutingModule } from './user-routing.module'

@NgModule({
  declarations: [ProfileComponent, LogoutComponent, NavigationMenuComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
