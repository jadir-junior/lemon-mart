import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth'
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'
import { IConfig, NgxMaskModule } from 'ngx-mask'

import { AngularFireModule } from '@angular/fire/compat'
import { AppComponent } from './app.component'
import { AppMaterialModule } from './app-material.module'
import { AppRoutingModule } from './app-routing.module'
import { AuthHttpInterceptor } from './auth/auth-http-interceptor'
import { AuthService } from './auth/auth.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { FieldErrorModule } from './user-controls/field-error/field-error.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { MatSidenavContainer } from '@angular/material/sidenav'
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component'
import { NgModule } from '@angular/core'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { ReactiveFormsModule } from '@angular/forms'
import { SimpleDialogComponent } from './common/simple-dialog.component'
import { authFactory } from './auth/auth.factory'
import { environment } from '../environments/environment'

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {
  showMaskTyped: true,
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    SimpleDialogComponent,
    NavigationMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FieldErrorModule,
    NgxMaskModule.forRoot(options),
  ],
  providers: [
    {
      provide: AuthService,
      useFactory: authFactory,
      deps: [AngularFireAuth, HttpClient],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    MatSidenavContainer,
  ],
  bootstrap: [AppComponent],
  entryComponents: [SimpleDialogComponent],
})
export class AppModule {}
