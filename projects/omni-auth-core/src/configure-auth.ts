import { InjectionToken, Provider, Type } from '@angular/core';
import { OmniAuthService } from './lib/auth.service';

export type AuthConfig = {
  /** @description Authentication service class */
  authService: Type<OmniAuthService>;
  bearerAuthentication?: {
    /**
     * @description List of endpoints that do not require authentication, can be RegExp or string.
     * In case of empty array, all endpoints will require authentication.
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
    /** @description Email validation pattern, used in sign out / sign in method */
    emailPattern?: RegExp;
    /** @description Password validation pattern, used in sign out / sign in method */
    passwordPattern?: RegExp;
  };
};

export const AUTH_CONFIG = new InjectionToken<AuthConfig>('AUTH_CONFIG');

export const configureAuth = (params: AuthConfig): Provider[] => {
  return [
    {
      provide: OmniAuthService,
      useClass: params.authService,
    },
    {
      provide: AUTH_CONFIG,
      useValue: params,
    },
  ];
};
