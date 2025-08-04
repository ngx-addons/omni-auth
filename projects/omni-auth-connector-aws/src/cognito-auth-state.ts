import {AuthState, OmniAuthError} from '@ngx-tools/omni-auth-core';

export class CognitoAuthState implements AuthState {
  constructor(
    public state: 'unknown' | 'authorized' | 'unauthorized' | 'error',
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

  static fromAuthorized(user: {
    displayName: string,
    email?: string;
    name?: string;
    phone?: string;
    verified: boolean;
  }) {
    return new CognitoAuthState('authorized', user);
  }

  static unknown() {
    return new CognitoAuthState('unknown');
  }

  static fromUnauthorized() {
    return new CognitoAuthState('unauthorized');
  }
}
