import {ResourceRef, Signal} from '@angular/core';
import {FlowError} from './error/flow-error';
import {OmniAuthError} from './error/auth-error';

export const isError = (response: OmniAuthError | void) => {
  return response instanceof OmniAuthError;
};

export type SocialProvider = 'google' | 'facebook' | 'apple' | 'github' | 'microsoft';

export type AuthState = {
  state: 'unknown' | 'authenticated' | 'unauthenticated' | 'error';
  user?: {
    displayName?: string;
    email?: string;
    name?: string;
    phone?: string;
    verified: boolean;
  };
  error?: OmniAuthError;
}

export abstract class OmniAuthService {
  abstract authState: ResourceRef<AuthState>;

  abstract currentUser: Signal<AuthState['user']>;

  abstract getToken: () => Promise<string | null>;

  abstract signOut(fromAllDevices?: boolean): Promise<void | FlowError>;

  abstract resendSignUpCode(params: {
    email: string;
  }): Promise<void | FlowError>;

  abstract signUp(params: {
    email: string;
    password: string;
    name: string;
    attributes?: Record<string, string | boolean>;
  }): Promise<void | FlowError>;

  abstract confirmSignUp(params: {
    email: string;
    code: string;
  }): Promise<void | FlowError>;

  abstract signIn(params: {
    email: string;
    password: string;
  }): Promise<void | FlowError>;

  abstract forgotPassword(params: {
    email: string;
  }): Promise<void | FlowError>;

  abstract confirmForgotPassword(params: {
    email: string;
    code: string;
    newPassword: string;
  }): Promise<void | FlowError>;

  abstract signInWithProvider(providerKey: SocialProvider): Promise<void | FlowError>;
}
