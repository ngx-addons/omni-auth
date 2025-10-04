import { ResourceRef, Signal } from '@angular/core';
import { FlowError } from './error/flow-error';
import { OmniAuthError } from './error/auth-error';
import { TokenProxy } from './token/token-proxy';
import { JwtToken } from './token/jwt-token';
import { Observable } from 'rxjs';

export const isError = (response: OmniAuthError | void) => {
  return response instanceof OmniAuthError;
};

export type CustomSignInProviderKey = string;
export type SocialSignInProviderKey =
  | 'google'
  | 'facebook'
  | 'apple'
  | 'github'
  | 'microsoft';

export type SignInProviderKey =
  | CustomSignInProviderKey
  | SocialSignInProviderKey;

export type AuthState<
  EXTRA_ACCESS_TOKEN_CLAIMS = unknown,
  EXTRA_ID_TOKEN_CLAIMS = unknown
> = {
  state: 'unknown' | 'authenticated' | 'unauthenticated' | 'error';
  user?: {
    displayName?: string;
    email?: string;
    fullName?: string;
    phone?: string;
    verified: boolean;
  };
  tokens?: TokenProxy<
    EXTRA_ACCESS_TOKEN_CLAIMS,
    EXTRA_ID_TOKEN_CLAIMS
  >;
  error?: OmniAuthError;
};

export abstract class OmniAuthService<
  EXTRA_ACCESS_TOKEN_CLAIMS = unknown,
  EXTRA_ID_TOKEN_CLAIMS = unknown,
> {
  abstract authState: ResourceRef<AuthState<
    EXTRA_ACCESS_TOKEN_CLAIMS,
    EXTRA_ID_TOKEN_CLAIMS
  >>;

  abstract currentUser: Signal<AuthState['user']>;

  /**
   * @description An ID token is an artifact that proves that
   * the user has been authenticated.
   *
   * @returns {undefined|null|JwtToken} undefined - means the token is still being loaded,
   * null means there is no access token (user not authenticated) JwtToken means the user is authenticated
   */
  abstract idToken$: Observable<
    JwtToken<EXTRA_ID_TOKEN_CLAIMS> | null | undefined
  >;

  /**
   * @description The access token is the artifact that allows
   * the client application to access the user's resource.
   *
   * @returns {undefined|null|JwtToken} undefined - means the token is still being loaded,
   * null means there is no access token (user not authenticated) JwtToken means the user is authenticated
   */
  abstract accessToken$: Observable<
    JwtToken<EXTRA_ACCESS_TOKEN_CLAIMS> | null | undefined
  >;

  abstract signOut(fromAllDevices?: boolean): Promise<void | FlowError>;

  abstract resendSignUpCode(params: {
    identifier: string;
  }): Promise<void | FlowError>;

  abstract signUp(params: {
    identifier: string;
    password: string;
    fullName?: string;
    customAttributes?: Record<string, string | boolean>;
  }): Promise<void | FlowError>;

  abstract confirmSignUp(params: {
    identifier: string;
    code: string;
  }): Promise<void | FlowError>;

  abstract signIn(params: {
    identifier: string;
    password: string;
  }): Promise<void | FlowError>;

  abstract forgotPassword(params: { identifier: string }): Promise<void | FlowError>;

  abstract confirmForgotPassword(params: {
    identifier: string;
    code: string;
    newPassword: string;
  }): Promise<void | FlowError>;

  abstract signInWithProvider(
    providerKey: SocialSignInProviderKey | CustomSignInProviderKey,
  ): Promise<void | FlowError>;
}
