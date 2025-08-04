import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {ConfirmSignUpComponent} from '../confirm-signup/confirm-signup.component';
import {SignUpComponent, SignUpComponentConfig} from '../signup/signup.component';
import {SignInComponent} from '../signin/signin.component';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';
import {
  AUTH_SERVICE,
  AuthRouteService,
  ContentConfig,
  defaultContent,
  OmniAuthService
} from '@ngx-tools/omni-auth-core';
import {MessageComponent} from '../ui/message/message.component';
import {ButtonComponent} from '../ui/button/button.component';
import {LoaderComponent} from '../ui/loader/loader.component';
import {AuthorizedComponent} from '../authorized/authorized.component';

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
    AuthorizedComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  authService = inject<OmniAuthService>(AUTH_SERVICE);
  authRouteService = inject(AuthRouteService);

  content = input<ContentConfig>(defaultContent);

  config = input<{
    signUp: SignUpComponentConfig
  }>();
}
