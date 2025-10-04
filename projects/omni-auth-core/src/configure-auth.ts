import {InjectionToken, Provider, Type} from '@angular/core';
import {OmniAuthService} from './lib/auth.service';
import {AuthRouteService} from './lib/routing/auth-route.service';
import {ActionErrorCollectorService} from './lib/error/action-error-collector.service';

export type AuthConfig = {
  /** @description Authentication service class */
  authService: Type<OmniAuthService>;

  /**  @description User identifier type, default is 'email' */
  identifierType: 'email' | 'username';

  bearerAuthentication?: {
    /**
     * @description List of endpoints that do not require authentication, can be RegExp or string.
     * In the case of an empty array, all endpoints will require authentication.
     * */
    whitelistedEndpoints: (RegExp | string)[];
    /** @description Authentication token header name, default is 'Authorization' */
    headerName?: string;
    /** @description Authentication token suffix, default is "Bearer " */
    headerValuePrefix?: string;
  };
  routing?: {
    /** @description The route to redirect to after successful login */
    secured: string[];
    /** @description The route to redirect to after logout */
    guest: string[];
  };
  validation?: {
    /** @description Identifier validation pattern, used in sign-out / sign in method */
    identifierPattern?: RegExp;
    /** @description Password validation pattern, used in sign-out / sign in method */
    passwordPattern?: RegExp;
  };
};

export const AUTH_CONFIG = new InjectionToken<AuthConfig>('AUTH_CONFIG');

export const configureAuth = (params: Partial<AuthConfig> & Pick<AuthConfig, 'authService'>): Provider[] => {
  return [
    AuthRouteService,
    ActionErrorCollectorService,
    {
      provide: OmniAuthService,
      useClass: params.authService,
    },
    {
      provide: AUTH_CONFIG,
      useValue: {
        ...params,
        identifierType: params.identifierType ?? 'email',
      },
    },
  ];
};
