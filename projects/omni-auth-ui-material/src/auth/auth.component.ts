import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {ConfirmSignUpComponent} from '../confirm-signup/confirm-signup.component';
import {SignUpComponent, SignUpComponentConfig} from '../signup/signup.component';
import { SignInComponent, SignInComponentConfig } from '../signin/signin.component';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';
import {
  AuthRouteService,
  ContentConfig,
  defaultContent,
  OmniAuthService
} from '@ngx-addons/omni-auth-core';
import {MessageComponent} from '../ui/message/message.component';
import {ButtonComponent} from '../ui/button/button.component';
import {LoaderComponent} from '../ui/loader/loader.component';
import {AuthenticatedComponent} from '../authenticated/authenticated.component';
import { SignInProvider } from '../social-buttons/social-buttons.component';

export type AuthComponentConfig = {
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

  content = input<ContentConfig>(defaultContent);

  config = input<AuthComponentConfig>();
}
