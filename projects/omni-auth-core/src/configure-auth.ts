import { inject, InjectionToken, Provider, Type } from '@angular/core';
import { OmniAuthService } from './lib/auth.interface';
import { HttpInterceptorFn } from '@angular/common/http';
import { from, switchMap } from 'rxjs';

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

export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  const config = inject<AuthConfig>(AUTH_CONFIG);
  const authService = inject(OmniAuthService);

  const bearerConfig = config.bearerAuthentication;

  if (bearerConfig?.whitelistedEndpoints?.length) {
    const whiteListed = bearerConfig?.whitelistedEndpoints.find((url) => {
      if (url instanceof RegExp) {
        return url.test(request.url);
      }
      return request.url.includes(url);
    });

    if (!whiteListed) {
      return next(request.clone());
    }
  }

  const token$ = from(authService.getToken());

  return token$.pipe(
    switchMap((token) => {
      if (!token) {
        return next(request.clone());
      }

      let headers = request.headers;

      headers = headers.append(
        bearerConfig?.headerName ?? 'Authorization',
        `${bearerConfig?.headerValuePrefix ?? 'Bearer '}${token}`,
      );

      const newReq = request.clone({ headers });

      return next(newReq);
    }),
  );
};
