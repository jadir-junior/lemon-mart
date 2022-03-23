// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AuthMode } from 'src/app/auth/auth.enum'

export const environment = {
  firebase: {
    projectId: 'lemon-mart-e2359',
    appId: '1:1023438678848:web:e1aa680a6e7105f378e8a5',
    storageBucket: 'lemon-mart-e2359.appspot.com',
    apiKey: 'AIzaSyCQ3tSI_NPzB4FwQge9ib2r8H9JkmOEONo',
    authDomain: 'lemon-mart-e2359.firebaseapp.com',
    messagingSenderId: '1023438678848',
    measurementId: 'G-ZDEDHK4L8X',
  },
  production: false,
  baseUrl: 'http://localhost:3000',
  authMode: AuthMode.CustomServer,
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
