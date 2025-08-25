import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  AUTH_CONFIG,
  AuthConfig,
} from './../../configure-auth';
import { OmniAuthService } from './../auth.interface';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

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

  const token$ = toObservable(authService.idToken);

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
