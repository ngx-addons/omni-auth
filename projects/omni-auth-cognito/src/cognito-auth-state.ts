import {AuthState, OmniAuthError} from '@ngx-tools/omni-auth-core';

export class CognitoAuthState implements AuthState {
  constructor(
    public state: 'unknown' | 'authenticated' | 'unauthenticated' | 'error',
    public user?: {
      displayName: string;
      email?: string;
      name?: string;
      phone?: string;
      verified: boolean;
    },
    public error?: OmniAuthError,
  ) {
  }

  static fromError(error: OmniAuthError) {
    return new CognitoAuthState('error', undefined, error);
  }

  static fromAuthenticated(user: {
    displayName: string,
    email?: string;
    name?: string;
    phone?: string;
    verified: boolean;
  }) {
    return new CognitoAuthState('authenticated', user);
  }

  static unknown() {
    return new CognitoAuthState('unknown');
  }

  static fromUnauthenticated() {
    return new CognitoAuthState('unauthenticated');
  }
}
