import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { AuthService } from './auth/auth.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { FlexLayoutModule } from '@angular/flex-layout'
import { HomeComponent } from './home/home.component'
import { HttpClientModule } from '@angular/common/http'
import { InMemoryAuthService } from './auth/auth.inmemory.service'
import { MaterialModule } from './material.module'
import { NgModule } from '@angular/core'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

@NgModule({
  declarations: [AppComponent, HomeComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
  ],
  providers: [{ provide: AuthService, useClass: InMemoryAuthService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
