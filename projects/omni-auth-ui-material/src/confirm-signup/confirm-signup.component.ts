import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../ui/button/button.component';
import { InputComponent } from '../ui/input/input.component';
import { MessageComponent } from '../ui/message/message.component';
import {
  AUTH_CONFIG,
  AuthConfig,
  AuthRouteService,
  ContentConfig,
  OmniAuthService,
  patterns,
} from '@ngx-addons/omni-auth-core';
import { PrintErrorComponent } from '../print-error/print-error.component';

@Component({
  selector: 'omni-auth-ui-mat-confirm-signup',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    FormsModule,
    InputComponent,
    MessageComponent,
    InputComponent,
    ButtonComponent,
    PrintErrorComponent,
  ],
  templateUrl: './confirm-signup.component.html',
  styleUrls: ['./confirm-signup.component.scss', '../auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmSignUpComponent {
  #authService = inject(OmniAuthService);
  authRoute = inject(AuthRouteService);
  #env = inject<AuthConfig>(AUTH_CONFIG);
  readonly content =
    input.required<
      Pick<ContentConfig, 'confirmationSignUp' | 'common' | 'errors'>
    >();

  readonly isLinkMode = input<boolean>(false);

  user: {
    identifier: string | null;
    code?: string;
  } = {
    identifier: null,
    code: undefined,
  };

  #defaultIdentifierPattern = (this.#env.identifierType === 'email' ? patterns.emailPattern : patterns.usernamePattern);
  identifierPattern = this.#env.validation?.identifierPattern || this.#defaultIdentifierPattern;
  passwordPattern = this.#env.validation?.passwordPattern || patterns.passwordPattern;

  readonly resending = signal(false);
  readonly processing = signal(false);
  disabledResend = false;

  async resendCode() {
    const identifier = this.user.identifier ?? this.authRoute.currentIdentifier();

    if (!identifier) {
      return;
    }

    this.resending.set(true);

    const hasError = await this.#authService.resendSignUpCode({
      identifier,
    });

    this.resending.set(false);

    if (!hasError) {
      this.disabledResend = true;
      setTimeout(() => {
        this.disabledResend = false;
      }, 60000);
    }
  }

  async onSubmit() {
    const identifier = this.user.identifier ?? this.authRoute.currentIdentifier();
    const code = this.user.code;

    if (!identifier || !code) {
      return;
    }

    this.processing.set(true);
    await this.#authService.confirmSignUp({
      identifier,
      code: String(code),
    });

    this.processing.set(false);
  }
}
