export const defaultContent = {
  loggedIn: {
    welcomeMessage: 'Welcome back, {{displayName}}!',
    welcomeMessageNoDisplayName: 'Welcome back!',
  },
  common: {
    emailLabel: 'Email',
    passwordLabel: 'Password',
    fullNameLabel: 'Full name',

    fullNameErrorRequiredText: 'Full name is required',
    fullNameErrorMinLengthText: 'Full name needs to be at least 2 characters long',
    fullNameErrorMaxLengthText: 'Full name can be maximum 255 characters long',
    fullNamePlaceholder: 'Joe Doe',

    emailErrorRequiredText: 'Email is required',
    emailErrorPatternText: 'Email is invalid',
    emailErrorMinLengthText: 'Email needs to be at least 3 characters long',
    emailErrorMaxLengthText: 'Email can be maximum 255 characters long',
    emailPlaceholder: 'joe.doe@example.com',

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
    usernameNotFound: 'Username not found',
    incorrectUsernameOrPassword: 'Password or email is incorrect',
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

export type ContentConfig = typeof defaultContent;
