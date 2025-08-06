import { OmniAuthError } from './auth-error';

export type ActionErrorCode =
  | 'unknown'
  | 'signInWithRedirectFailure'
  | 'userDoesNotExist'
  | 'alreadySignedIn'
  | 'incorrectUsernameOrPassword'
  | 'usernameNotFound'
  | 'invalidConfiguration'
  | 'cancelledFlow'
  | 'invalidCode';

export class FlowError extends OmniAuthError {
  constructor(
    public source:
      | 'signIn'
      | 'signInWithProvider'
      | 'forgotPassword'
      | 'signUp'
      | 'confirmSignUp'
      | 'resendSignUpCode'
      | 'confirmForgotPassword'
      | 'signOut',
    public code: ActionErrorCode,
    public override error: Error | unknown,
    public silent = false,
  ) {
    super(error);
  }
}
