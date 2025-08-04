import {ResourceRef, Signal} from '@angular/core';
import {FlowError} from './error/flow-error';
import {OmniAuthError} from './error/auth-error';

export const isError = (response: OmniAuthError | void) => {
  return response instanceof OmniAuthError;
};

export type SocialProvider = 'google' | 'facebook' | 'apple' | 'github' | 'microsoft';

export interface AuthState {
  state: 'unknown' | 'authorized' | 'unauthorized' | 'error';
  user?: {
    displayName?: string;
    email?: string;
    name?: string;
    phone?: string;
    verified: boolean;
  };
  error?: OmniAuthError;
}

export type OmniAuthService = {
  authState: ResourceRef<AuthState>;

  currentUser: Signal<AuthState['user']>;

  getToken: () => Promise<string | null>;

  signOut(fromAllDevices?: boolean): Promise<void | FlowError>;

  resendSignUpCode(params: {
    email: string;
  }): Promise<void | FlowError>;

  signUp(params: {
    email: string;
    password: string;
    name: string;
    attributes?: Record<string, string | boolean>;
  }): Promise<void | FlowError>;

  confirmSignUp(params: {
    email: string;
    code: string;
  }): Promise<void | FlowError>;

  signIn(params: {
    email: string;
    password: string;
  }): Promise<void | FlowError>;

  forgotPassword(params: {
    email: string;
  }): Promise<void | FlowError>;

  confirmForgotPassword(params: {
    email: string;
    code: string;
    newPassword: string;
  }): Promise<void | FlowError>;

  signInWithProvider(providerKey: SocialProvider): Promise<void | FlowError>;
}
