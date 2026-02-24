import { OmniAuthError } from './auth-error';

export type ActionErrorCode =
  | 'unknown'
  | 'signInWithRedirectFailure'
  | 'notVerified'
  | 'userDoesNotExist'
  | 'userAlreadyExists'
  | 'userIsNotConfirmed'
  | 'alreadySignedIn'
  | 'incorrectIdentifierOrPassword'
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
      | 'confirmSignIn'
      | 'resendSignUpCode'
      | 'confirmForgotPassword'
      | 'confirmForgotPasswordLink'
      | 'changePassword'
      | 'signOut',
    public code: ActionErrorCode,
    public override error: Error | unknown,
    public silent = false,
  ) {
    super(error);
  }
}
