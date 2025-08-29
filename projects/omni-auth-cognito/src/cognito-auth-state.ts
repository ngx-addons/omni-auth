import {
  AuthState,
  OmniAuthError,
  TokenProxy,
} from '@ngx-addons/omni-auth-core';

export class CognitoAuthState implements AuthState {
  constructor(
    public state: 'unknown' | 'authenticated' | 'unauthenticated' | 'error',
    public user?: {
      displayName: string;
      email?: string;
      fullName?: string;
      phone?: string;
      verified: boolean;
    },
    public tokens?: TokenProxy,
    public error?: OmniAuthError,
  ) {}

  static fromError(error: OmniAuthError) {
    return new CognitoAuthState('error', undefined, undefined, error);
  }

  static fromAuthenticated(
    user: {
      displayName: string;
      email?: string;
      fullName?: string;
      phone?: string;
      verified: boolean;
    },
    tokens: TokenProxy,
  ) {
    return new CognitoAuthState('authenticated', user, tokens);
  }

  static unknown() {
    return new CognitoAuthState('unknown');
  }

  static fromUnauthenticated() {
    return new CognitoAuthState('unauthenticated');
  }
}
