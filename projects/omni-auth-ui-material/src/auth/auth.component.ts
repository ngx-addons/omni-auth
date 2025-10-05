import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {ConfirmSignUpComponent} from '../confirm-signup/confirm-signup.component';
import {SignUpComponent, SignUpComponentConfig} from '../signup/signup.component';
import {SignInComponent, SignInComponentConfig} from '../signin/signin.component';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';
import {
  AUTH_CONFIG,
  AuthRouteService,
  ContentConfig,
  defaultContentEmail, defaultContentUsername,
  OmniAuthService
} from '@ngx-addons/omni-auth-core';
import {MessageComponent} from '../ui/message/message.component';
import {ButtonComponent} from '../ui/button/button.component';
import {LoaderComponent} from '../ui/loader/loader.component';
import {AuthenticatedComponent} from '../authenticated/authenticated.component';

export type AuthComponentConfig = {
  /**
   * Hide message when user is authenticated.
   */
  hideAuthenticatedContent?: boolean;
  signUp?: SignUpComponentConfig,
  signIn?: SignInComponentConfig;
}

@Component({
  selector: 'omni-auth-ui-mat',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    SignInComponent,
    SignUpComponent,
    ConfirmSignUpComponent,
    ResetPasswordComponent,
    MessageComponent,
    ButtonComponent,
    LoaderComponent,
    AuthenticatedComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  authService = inject(OmniAuthService);
  authRouteService = inject(AuthRouteService);
  #env = inject(AUTH_CONFIG);

  readonly content = input<ContentConfig>(this.#env.identifierType === 'email' ? defaultContentEmail : defaultContentUsername);

  readonly config = input<AuthComponentConfig>();
}
