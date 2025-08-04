import {inject, InjectionToken, provideAppInitializer, Provider} from '@angular/core';
import {Amplify} from 'aws-amplify';
import {AuthAwsCognitoService} from './auth-aws-cognito.service';

export type AuthCognitoConfig = {
  cognito: {
    userPoolId: string,
    userPoolClientId: string,
    oauth?: {
      domain: string,
      providers: ['Google'],
      redirectSignIn: string[],
      redirectSignOut: string[],
    }
  };
};

export const AUTH_COGNITO_CONFIG = new InjectionToken<AuthCognitoConfig>('AUTH_COGNITO_CONFIG');

export const configureAuthCognitoConnector = (params: AuthCognitoConfig): Provider[] => {
  const oauth = params.cognito.oauth;

  let providers: Provider = [
    {
      provide: AUTH_COGNITO_CONFIG,
      useValue: params,
    }
  ]

  if (oauth) {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: params.cognito.userPoolId,
          userPoolClientId: params.cognito.userPoolClientId,
          loginWith: {
            oauth: {
              scopes: ['email', 'openid', 'aws.cognito.signin.user.admin'],
              responseType: 'code',
              ...oauth,
            }
          }
        },
      },
    });

    providers.push(
      provideAppInitializer(() => {
        const service = inject(AuthAwsCognitoService);
        return service.startListening();
      })
    )
  } else {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: params.cognito.userPoolId,
          userPoolClientId: params.cognito.userPoolClientId,
        },
      },
    });
  }

  return providers;
};
