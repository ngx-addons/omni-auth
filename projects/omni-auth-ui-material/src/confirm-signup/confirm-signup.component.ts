import {ChangeDetectionStrategy, Component, inject, input, Input, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ButtonComponent} from '../ui/button/button.component';
import {InputComponent} from '../ui/input/input.component';
import {MessageComponent} from '../ui/message/message.component';
import {
  AUTH_CONFIG,
  AUTH_SERVICE, AuthConfig,
  AuthRouteService,
  ContentConfig,
  OmniAuthService, patterns,
} from '@ngx-tools/omni-auth-core';
import {PrintErrorComponent} from '../print-error/print-error.component';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmSignUpComponent {
  #authService = inject<OmniAuthService>(AUTH_SERVICE);
  authRoute = inject(AuthRouteService);
  content = input.required<Pick<ContentConfig, 'confirmationSignUp' | 'common' | 'errors'>>();
  #env = inject<AuthConfig>(AUTH_CONFIG);

  user: {
    email: string | null;
    code?: string;
  } = {
    email: null,
    code: undefined,
  };

  emailPattern = this.#env.validation?.emailPattern || patterns.emailPattern;

  readonly resending = signal(false);
  readonly processing = signal(false);
  disabledResend = false;

  async resendCode() {
    const email = this.user.email ?? this.authRoute.currentEmail();

    if (!email) {
      return;
    }

    this.resending.set(true);

    const hasError = await this.#authService.resendSignUpCode({
      email,
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
    const email = this.user.email ?? this.authRoute.currentEmail();
    const code = this.user.code;

    if (!email || !code) {
      return;
    }

    this.processing.set(true);
    const response = await this.#authService.confirmSignUp({
      email,
      code: String(code),
    });

    this.processing.set(false);
  }
}
