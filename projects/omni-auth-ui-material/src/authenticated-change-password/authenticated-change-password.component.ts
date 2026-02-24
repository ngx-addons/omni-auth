import {ChangeDetectionStrategy, Component, inject, input, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageComponent} from '../ui/message/message.component';
import {InputComponent} from '../ui/input/input.component';
import {
  AUTH_CONFIG,
  AuthConfig,
  AuthRouteService,
  ContentConfig,
  OmniAuthService,
  patterns,
} from '@ngx-addons/omni-auth-core';
import {FormsModule} from '@angular/forms';
import {ButtonComponent} from '../ui/button/button.component';
import {PrintErrorComponent} from '../print-error/print-error.component';

@Component({
  selector: 'omni-auth-ui-mat-authenticated-change-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputComponent,
    MessageComponent,
    MessageComponent,
    ButtonComponent,
    PrintErrorComponent,
  ],
  templateUrl: './authenticated-change-password.component.html',
  styleUrls: ['./authenticated-change-password.component.scss', '../auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticatedChangePasswordComponent {
  #authService = inject(OmniAuthService);
  #env = inject<AuthConfig>(AUTH_CONFIG);
  authRoute = inject(AuthRouteService);
  readonly content = input.required<Pick<ContentConfig, 'resetPassword' | 'common' | 'errors'>>();
  readonly isLinkMode = input<boolean>(false);

  user: {
    password: string | null;
  } = {
    password: null,
  };

  #defaultIdentifierPattern = (this.#env.identifierType === 'email' ? patterns.emailPattern : patterns.usernamePattern);
  identifierPattern = this.#env.validation?.identifierPattern || this.#defaultIdentifierPattern;
  passwordPattern = this.#env.validation?.passwordPattern || patterns.passwordPattern;

  readonly processing = signal(false);

  async onSubmit() {
    const newPassword = this.user.password;

    if (!newPassword) {
      return;
    }

    this.processing.set(true);
    await this.#authService.changePassword({
      newPassword,
    });

    this.processing.set(false);
  }
}
