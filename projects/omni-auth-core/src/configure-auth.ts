import { InjectionToken, Provider, Type } from '@angular/core';
import { OmniAuthService } from './lib/auth.interface';

export const AUTH_SERVICE = new InjectionToken<OmniAuthService>(
  'OMNI_AUTH_SERVICE',
);

export type AuthConfig = {
  authService: Type<OmniAuthService>;
  bearerAuthentication?: {
    whitelistedEndpoints: (RegExp | string)[];
  };
  routing?: {
    secured: string[];
    guest: string[];
  };
  validation?: {
    emailPattern?: RegExp;
    passwordPattern?: RegExp;
  }
};

export const AUTH_CONFIG = new InjectionToken<AuthConfig>('AUTH_CONFIG');

export const configureAuth = (params: AuthConfig): Provider[] => {
  return [
    {
      provide: AUTH_SERVICE,
      useClass: params.authService,
    },
    {
      provide: AUTH_CONFIG,
      useValue: params,
    },
  ];
};
