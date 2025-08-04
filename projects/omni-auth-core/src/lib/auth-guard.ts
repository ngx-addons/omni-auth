import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { AUTH_SERVICE } from '../configure-auth';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, skipWhile, take } from 'rxjs';
import { OmniAuthService } from './auth.interface';

export const onlyAuthenticated: (config: {
  redirectTo: string[];
}) => CanActivateFn =
  (config) => (route: ActivatedRouteSnapshot) => {
    const authService = inject<OmniAuthService>(AUTH_SERVICE);

    // todo signal?
    const loading$ = toObservable(authService.authState.isLoading);

    return loading$.pipe(
      skipWhile((loading) => loading),
      map(() => {
        const user = authService.authState.value();
        if (user === null) {
          return createUrlTreeFromSnapshot(route, config.redirectTo);
        }

        return true;
      }),
      take(1),
    );
  };

export const onlyGuest: (config: { redirectTo: string[] }) => CanActivateFn = (
  config,
) => {
  return (route: ActivatedRouteSnapshot) => {
    const authService = inject<OmniAuthService>(AUTH_SERVICE);

    const loading$ = toObservable(authService.authState.isLoading);
    return loading$.pipe(
      skipWhile((loading) => loading),
      map(() => {
        const user = authService.authState.value();

        if (user !== null) {
          return createUrlTreeFromSnapshot(route, config.redirectTo);
        }

        return true;
      }),
      take(1),
    );
  };
};
