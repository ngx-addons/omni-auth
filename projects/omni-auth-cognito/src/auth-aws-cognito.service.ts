import {
  computed,
  inject,
  Injectable,
  resource,
  ResourceRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  confirmResetPassword,
  confirmSignUp,
  fetchAuthSession,
  fetchUserAttributes,
  resendSignUpCode,
  resetPassword,
  signIn,
  signInWithRedirect,
  SignInWithRedirectInput,
  signOut,
  signUp,
} from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import {
  ActionErrorCollectorService,
  AUTH_CONFIG,
  AuthConfig,
  AuthRouteService,
  AuthState,
  FlowError,
  OmniAuthError,
  OmniAuthService,
  RuntimeError,
  SignInProviderKey
} from '@ngx-addons/omni-auth-core';
import { CognitoAuthState } from './cognito-auth-state';
import { Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthAwsCognitoService extends OmniAuthService {
  #authRouteService = inject(AuthRouteService);
  #actionErrorCollector = inject(ActionErrorCollectorService);
  #router = inject(Router);
  #env = inject<AuthConfig>(AUTH_CONFIG);
  #document = inject<Document>(DOCUMENT);
  #navigateOnLoad$?: Subscription;

  #hubListenerCancelToken = () => {};

  startListening() {
    this.#hubListenerCancelToken = Hub.listen('auth', ({ payload }) => {
      this.#actionErrorCollector.reset();
      switch (payload.event) {
        case 'signInWithRedirect':
          this.#onLoginSuccess();
          this.stopListening();
          break;
        case 'signInWithRedirect_failure':
          this.stopListening();
          this.#handleError(
            this.#transformError('signInWithProvider', payload.data.error),
          );
          break;
        case 'customOAuthState':
          this.stopListening();
          this.#handleError(
            new FlowError(
              'signInWithProvider',
              'invalidConfiguration',
              new RuntimeError('Custom OAuth state handling not implemented'),
            ),
          );
          break;
      }
    });
  }

  stopListening() {
    this.#hubListenerCancelToken();
  }

  authState: ResourceRef<AuthState> = resource({
    defaultValue: CognitoAuthState.unknown(),
    loader: async () => {
      try {
        const session = await fetchAuthSession();

        if (!session?.tokens?.idToken && !session.tokens?.accessToken) {
          return CognitoAuthState.fromUnauthenticated();
        }

        const user = await fetchUserAttributes();

        if (!user) {
          throw 'Runtime error: user authenticated, but cannot be fetched';
        }

        return CognitoAuthState.fromAuthenticated({
          displayName: user.name ?? user.email ?? '',
          email: user.email,
          name: user.name,
          phone: user.phone_number,
          verified: Boolean(user.email_verified),
        });
      } catch (e) {
        return CognitoAuthState.fromError(new OmniAuthError(e));
      }
    },
  });

  readonly currentUser = computed(() => {
    const state = this.authState.value();

    return state.user;
  });

  #isAuthenticated$ = toObservable(
    computed(() => {
      const state = this.authState.value();
      return state.state === 'authenticated';
    }),
  ).pipe(filter(Boolean));

  getToken = async () => {
    const session = await fetchAuthSession();
    return session?.tokens?.idToken?.toString() ?? null;
  };

  async signOut(fromAllDevices = false): Promise<void | FlowError> {
    try {
      this.#actionErrorCollector.reset();
      const window = this.#document.defaultView;

      if (!window) {
        throw new RuntimeError(
          'Window is not available. Cannot sign out.',
          'Make sure to run this code in a browser environment.',
        );
      }

      let redirectUrl = window.location.origin;

      if (this.#env.routing?.guest) {
        redirectUrl =
          redirectUrl +
          '/' +
          this.#router.createUrlTree(this.#env.routing?.guest).toString();
      }

      await signOut({
        global: fromAllDevices,
        oauth: {
          redirectUrl,
        },
      });

      this.authState.reload();
      this.#authRouteService.navigateToGuestPage();
    } catch (error) {
      return this.#handleError(this.#transformError('signOut', error));
    }
  }

  async signUp(params: {
    password: string;
    email: string;
    name: string;
    attributes?: Record<string, string | boolean | number | Date>;
  }): Promise<void | FlowError> {
    try {
      this.#actionErrorCollector.reset();

      const customAttributes = Object.fromEntries(
        Object.entries(params.attributes || {}).map(([key, value]) => {
          return [
            `custom:${key}`,
            typeof value === 'number' ? value : String(value),
          ];
        }),
      );

      const { nextStep } = await signUp({
        username: params.email,
        password: params.password,
        options: {
          userAttributes: {
            email: params.email,
            name: params.name,
            ...customAttributes,
          },
        },
      });

      switch (nextStep.signUpStep) {
        case 'DONE':
          this.#authRouteService.nextStep('login', { email: params.email });
          break;
        case 'CONFIRM_SIGN_UP':
          this.#authRouteService.nextStep('confirm_sign_up', {
            email: params.email,
          });
          break;
        case 'COMPLETE_AUTO_SIGN_IN':
          this.#authRouteService.nextStep('login', { email: params.email });
          break;
      }
    } catch (error) {
      return this.#handleError(this.#transformError('signUp', error));
    }
  }

  async confirmSignUp(params: {
    email: string;
    code: string;
    newPassword: string;
  }): Promise<void | FlowError> {
    try {
      this.#actionErrorCollector.reset();

      const { nextStep } = await confirmSignUp({
        username: params.email,
        confirmationCode: params.code,
      });

      switch (nextStep.signUpStep) {
        case 'DONE':
          this.#authRouteService.nextStep('login', { email: params.email });
          break;
        case 'CONFIRM_SIGN_UP':
          this.#authRouteService.nextStep('confirm_sign_up', {
            email: params.email,
          });
          break;
        case 'COMPLETE_AUTO_SIGN_IN':
          this.#authRouteService.nextStep('login', { email: params.email });
          break;
        default:
          throw new RuntimeError('Unexpected next step: ' + nextStep);
      }
    } catch (error: Error | any) {
      if (
        'message' in error &&
        error.message ===
          'User cannot be confirmed. Current status is CONFIRMED'
      ) {
        this.#authRouteService.nextStep('login', { email: params.email });
      }
      return this.#handleError(this.#transformError('signIn', error));
    }
  }

  async resendSignUpCode(params: { email: string }): Promise<void | FlowError> {
    try {
      this.#actionErrorCollector.reset();

      await resendSignUpCode({
        username: params.email,
      });
    } catch (error) {
      return this.#handleError(this.#transformError('resendSignUpCode', error));
    }
  }

  async signIn(params: {
    email: string;
    password: string;
  }): Promise<void | FlowError> {
    try {
      this.#actionErrorCollector.reset();

      const { nextStep } = await signIn({
        username: params.email,
        password: params.password,
      });

      switch (nextStep.signInStep) {
        case 'DONE':
          this.#onLoginSuccess();
          break;
        case 'CONFIRM_SIGN_UP':
          this.#authRouteService.nextStep('confirm_sign_up', {
            email: params.email,
          });
          break;
        case 'RESET_PASSWORD':
          this.#authRouteService.nextStep('reset_password', {
            email: params.email,
          });
          break;

        default:
          throw new RuntimeError('Unexpected next step: ' + nextStep);
      }
    } catch (error) {
      return this.#handleError(this.#transformError('signIn', error));
    }
  }

  async forgotPassword(params: { email: string }): Promise<void | FlowError> {
    try {
      this.#actionErrorCollector.reset();

      const { nextStep } = await resetPassword({
        username: params.email,
      });

      switch (nextStep.resetPasswordStep) {
        case 'DONE':
          this.#authRouteService.nextStep('login', { email: params.email });
          break;
        case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
          this.#authRouteService.nextStep('reset_password', {
            email: params.email,
          });
          break;
        default:
          throw new RuntimeError('Unexpected next step: ' + nextStep);
      }
    } catch (error) {
      return this.#handleError(this.#transformError('forgotPassword', error));
    }
  }

  async confirmForgotPassword(params: {
    email: string;
    code: string;
    newPassword: string;
  }): Promise<void | FlowError> {
    try {
      this.#actionErrorCollector.reset();

      await confirmResetPassword({
        username: params.email,
        confirmationCode: params.code,
        newPassword: params.newPassword,
      });

      this.#authRouteService.nextStep('login', { email: params.email });
    } catch (error) {
      return this.#handleError(
        this.#transformError('confirmForgotPassword', error),
      );
    }
  }

  async signInWithProvider(
    provider: SignInProviderKey,
  ): Promise<void | FlowError> {
    try {
      this.#actionErrorCollector.reset();

      let amazonProvider: SignInWithRedirectInput['provider'];

      switch (provider) {
        case 'google':
          amazonProvider = 'Google';
          break;
        case 'facebook':
          amazonProvider = 'Facebook';
          break;
        case 'apple':
          amazonProvider = 'Apple';
          break;
        case 'amazon':
          amazonProvider = 'Amazon';
          break;
        default:
          amazonProvider = {
            custom: provider,
          };
      }

      await signInWithRedirect({
        provider: amazonProvider,
      });
    } catch (error) {
      return this.#handleError(
        this.#transformError('signInWithProvider', error),
      );
    }
  }

  #transformError(source: FlowError['source'], error: unknown) {
    switch (true) {
      case String(error).includes('already a signed in user'):
        return new FlowError(source, 'alreadySignedIn', error);
      case String(error).includes('User does not exist.'):
        return new FlowError(source, 'userDoesNotExist', error);
      case String(error).includes('Incorrect username or password.'):
        return new FlowError(source, 'incorrectUsernameOrPassword', error);
      case String(error).includes('Username/client id combination not found.'):
        return new FlowError(source, 'usernameNotFound', error);
      case String(error).includes(
        'Invalid verification code provided, please try again',
      ):
        return new FlowError(source, 'invalidCode', error);
      case String(error).includes('The given preferredRedirectUrl'):
        return new FlowError(source, 'invalidConfiguration', error, true);
      case String(error).includes('User cancelled OAuth flow'):
        return new FlowError(source, 'cancelledFlow', error, true);
      case String(error).includes('can not be converted to'):
        return new FlowError(
          source,
          'invalidConfiguration',
          new RuntimeError(
            'Invalid configuration, see console for details',
            'Make sure you set up the attributes options correctly.',
          ),
          true,
        );
      default:
        return new FlowError(source, 'unknown', error);
    }
  }

  #handleError(error: FlowError) {
    this.#actionErrorCollector.handle(error);
    return error;
  }

  #onLoginSuccess() {
    this.#authRouteService.nextStep('login');
    this.authState.reload();

    if (this.#navigateOnLoad$) {
      return;
    }

    this.#navigateOnLoad$ = this.#isAuthenticated$.subscribe(() => {
      this.#authRouteService.navigateToSecuredPage();
      this.#navigateOnLoad$?.unsubscribe();
    });
  }
}
