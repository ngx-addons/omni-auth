import {
  AuthState,
  OmniAuthError,
  TokenProxy,
} from '@ngx-addons/omni-auth-core';

export class SupabaseAuthState implements AuthState {
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
    return new SupabaseAuthState('error', undefined, undefined, error);
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
    return new SupabaseAuthState('authenticated', user, tokens);
  }

  static unknown() {
    return new SupabaseAuthState('unknown');
  }

  static fromUnauthenticated() {
    return new SupabaseAuthState('unauthenticated');
  }
}
