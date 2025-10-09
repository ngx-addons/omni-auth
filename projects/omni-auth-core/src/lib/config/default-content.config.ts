export const defaultContentEmail = {
  loggedIn: {
    welcomeMessage: 'Welcome back, {{displayName}}!',
    welcomeMessageNoDisplayName: 'Welcome back!',
  },
  common: {
    identifierLabel: 'Email',
    passwordLabel: 'Password',

    identifierErrorRequiredText: 'Email is required',
    identifierErrorPatternText: 'Email is invalid',
    identifierErrorMinLengthText: 'Email needs to be at least 3 characters long',
    identifierErrorMaxLengthText: 'Email can be maximum 255 characters long',
    identifierPlaceholder: 'joe.doe@example.com',

    passwordErrorRequiredText: 'Password is required',
    passwordErrorMinLengthText:
      'Password needs to be at least 8 characters long',
    passwordPatternText:
      'Password must contain at least 8 characters, one uppercase letter,' +
      ' one lowercase letter, one number and one special character',
    passwordPlaceholder: '********',

    codeLabel: 'Code',
    codeErrorRequiredText: 'Code is required',
    codePlaceholder: '000000',

    backToSignInLabel: 'Back to login',

    icons: {
      back: 'chevron_backward',
      email: 'email',
    },
  },
  signIn: {
    title: 'Login',
    errorSubmitMessage: 'Error while signing in',
    submitLabel: 'Login',
    forgetPassword: 'I forgot my password',
  },
  signUp: {
    title: 'Register',
    errorSubmitMessage: 'Error while signing up',
    submitLabel: 'Create account',
    termsAndConditionsText: 'By continuing, you agree to our',
    termsAndConditionsLinkText: 'Terms and Conditions',
  },
  confirmationSignUp: {
    subTitle: 'Confirm your e-mail address',
    paragraph:
      'A confirmation e-mail has been sent.\n' +
      'Check your inbox and write the code below to confirm your e-mail address.',
    errorSubmitMessage: 'Error while signing up',
    submitLabel: 'Verify',
    resendLabel: 'Resend code',
    errorResendMessage: 'Error while resending code',
  },
  resetPassword: {
    title: 'Confirmation code',
    sendCodeMessage:
      'Enter the e-mail address you used to sign up, we will send you a code to reset your password.',
    providePasswordMessage: 'Enter code and new password',
    repeatPassword: 'Repeat password',
    errorSubmitMessage: 'Error while resetting password',
    errorSendCodeMessage: 'Error while sending code',
    sendCodeLabel: 'Send code',
    submitLabel: 'Reset password',
  },
  socialButtons: {
    orLine: 'or use one of these options',
    signInWithGoogle: 'Sign in with Google',
    signInWithApple: 'Sign in with Apple',
    signInWithFacebook: 'Sign in with Facebook',

  },
  errors: {
    invalidCode: 'Provided code is invalid',
    incorrectIdentifierOrPassword: 'Password or email is incorrect',
    userDoesNotExist: 'User does not exist',
    userIsNotConfirmed: 'User is not confirmed',
    userAlreadyExists: 'User already exists',
    notVerified: 'Check your email to verify your account',
    alreadySignedIn: 'You are already signed in',
    signInWithRedirectFailure: 'Sign in using external provider failed',
    invalidConfiguration: 'Missing or invalid configuration, see console for details',
    cancelledFlow: 'Flow was cancelled by user',
    unknown: 'An unknown error occurred',
  },
};

export const defaultContentUsername = {
  ...defaultContentEmail,
  common: {
    ...defaultContentEmail.common,
    identifierLabel: 'Username',
    identifierErrorRequiredText: 'Username is required',
    identifierErrorPatternText: 'Username is invalid',
    identifierErrorMinLengthText: 'Username needs to be at least 3 characters long',
    identifierErrorMaxLengthText: 'Username can be maximum 255 characters long',
    identifierPlaceholder: 'joe.doe',
  },
  errors: {
    ...defaultContentEmail.errors,
    incorrectIdentifierOrPassword: 'Password or username is incorrect',
  }
}

export type ContentConfig = typeof defaultContentEmail;
