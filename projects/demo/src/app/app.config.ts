import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {configureAuth} from '@ngx-addons/omni-auth-core';
import {AuthAwsCognitoService, configureAuthCognitoConnector} from '@ngx-addons/omni-auth-cognito';
import {environment} from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    configureAuth({
      authService: AuthAwsCognitoService
    }),
    configureAuthCognitoConnector({
      cognito: {
        userPoolId: environment.cognito.userPoolId,
        userPoolClientId: environment.cognito.userPoolClientId,
        oauth: {
          domain: environment.cognito.userPoolDomain,
          redirectSignIn: ['http://localhost:4200'],
          redirectSignOut: ['http://localhost:4200'],
          providers: ['Google']
        }
      }
    })
  ],
};
