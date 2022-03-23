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
  production: true,
  authMode: AuthMode.CustomServer,
  baseUrl: 'http://localhost:3000',
}
