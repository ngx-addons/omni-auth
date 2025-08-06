import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, skipWhile, take } from 'rxjs';
import { OmniAuthService } from './auth.interface';
import { AUTH_CONFIG, AuthConfig } from '../configure-auth';

/**
 * @description Guard that checks if the user is authenticated user otherwise redirects to the specified route.
 * @param config
 */
export const onlyAuthenticated: (config?: {
  /**
   * @description The route to redirect if someone is not authenticated. If not provided, will use the default from the AuthConfig.
   */
  redirectTo?: string[];
}) => CanActivateFn = (config) => (route: ActivatedRouteSnapshot) => {
  const authService = inject(OmniAuthService);
  const libConfig = inject<AuthConfig>(AUTH_CONFIG);

  const loading$ = toObservable(authService.authState.isLoading);

  console.log('Checking authentication state...');

  return loading$.pipe(
    skipWhile((loading) => loading),
    map(() => {
      const authenticated = authService.authState.value().state === 'authenticated';
      if (!authenticated) {
        console.log('User is not authenticated, redirecting...', config?.redirectTo ?? libConfig.routing?.guest ?? ['/']);
        return createUrlTreeFromSnapshot(
          route,
          config?.redirectTo ?? libConfig.routing?.guest ?? ['/'],
        );
      }

      console.log('User is authenticated, allowing access to the route');

      return true;
    }),
    take(1),
  );
};

/**
 * @description Guard that checks if the user is not authenticated otherwise redirects to the specified route.
 * @param config
 */
export const onlyGuest: (config?: {
  /**
   * @description The route to in case of unauthenticated user. If not provided, will use the default from the AuthConfig.
   */
  redirectTo?: string[];
}) => CanActivateFn = (config) => {
  return (route: ActivatedRouteSnapshot) => {
    const authService = inject(OmniAuthService);
    const libConfig = inject<AuthConfig>(AUTH_CONFIG);

    const loading$ = toObservable(authService.authState.isLoading);
    return loading$.pipe(
      skipWhile((loading) => loading),
      map(() => {
        const authenticated = authService.authState.value().state === 'authenticated';

        if (authenticated) {
          return createUrlTreeFromSnapshot(
            route,
            config?.redirectTo ?? libConfig.routing?.secured ?? ['/'],
          );
        }

        return true;
      }),
      take(1),
    );
  };
};
