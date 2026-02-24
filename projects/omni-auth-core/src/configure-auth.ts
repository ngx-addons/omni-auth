import { InjectionToken, Provider, Type } from '@angular/core';
import { OmniAuthService } from './lib/auth.service';
import { AuthRouteService } from './lib/routing/auth-route.service';
import { ActionErrorCollectorService } from './lib/error/action-error-collector.service';

export type AuthConfig = {
  /**
   * Authentication service class
   */
  authService: Type<OmniAuthService>;

  /**
   * User identifier type, default is 'email'
   */
  identifierType: 'email' | 'username' | 'phone';

  /**
   * Passwordless authentication, if true, the user will not be asked for a password
   * when logging in, instead the user will receive a code to log in.
   */
  passwordlessEnabled: boolean;

  /**
   * Automatic bearer authentication, if exist interceptor will be added automatically
   */
  bearerAuthentication?: {
    /**
     * List of endpoints that do not require authentication, can be RegExp or string.
     * In the case of an empty array, all endpoints will require authentication.
     */
    whitelistedEndpoints: (RegExp | string)[];
    /**
     * Authentication token header name, default is 'Authorization'
     */
    headerName?: string;
    /**
     * Authentication token suffix, default is "Bearer "
     */
    headerValuePrefix?: string;
  };

  /**
   * The routing configuration, e.g. redirect after login
   */
  routing?: {
    /**
     * The route to redirect to after successful login
     */
    secured: string[];
    /**
     * The route to redirect to after logout
     */
    guest: string[];
  };

  /**
   * Validate data before sending it to the server (it applies to input fields)
   */
  validation?: {
    /**
     * Identifier validation pattern, used in sign-out / sign in method
     */
    identifierPattern?: RegExp;
    /**
     * Password validation pattern, used in sign-out / sign in method
     */
    passwordPattern?: RegExp;
  };
};

export const AUTH_CONFIG = new InjectionToken<AuthConfig>('AUTH_CONFIG');

export type AuthConfigInput = Partial<AuthConfig> & Pick<AuthConfig, 'authService'>;
export const configureAuth = (params: AuthConfigInput): Provider[] => {
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
