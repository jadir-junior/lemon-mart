import { CommonModule } from '@angular/common'
import { LemonRaterComponent } from './lemon-rater.component'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [LemonRaterComponent],
  imports: [CommonModule],
  exports: [LemonRaterComponent],
})
export class LemonRaterModule {}
