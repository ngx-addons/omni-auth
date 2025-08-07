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
  selector: 'omni-auth-ui-mat-reset-password',
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
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss', '../auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {
  #authService = inject(OmniAuthService);
  #env = inject<AuthConfig>(AUTH_CONFIG);
  authRoute = inject(AuthRouteService);
  readonly content = input.required<Pick<ContentConfig, 'resetPassword' | 'common' | 'errors'>>();

  user: {
    email: string | null;
    code: string | null;
    password: string | null;
  } = {
    email: null,
    code: null,
    password: null,
  };

  emailPattern = this.#env.validation?.emailPattern || patterns.emailPattern;
  passwordPattern = this.#env.validation?.passwordPattern || patterns.passwordPattern;

  readonly resending = signal(false);
  readonly processing = signal(false);
  codeSent = false;

  async sendCode() {
    const email = this.user.email ?? this.authRoute.currentEmail();

    if (!email) {
      return;
    }

    this.resending.set(true);

    const hasError = await this.#authService.forgotPassword({
      email,
    });

    this.resending.set(false);

    if (!hasError) {
      this.codeSent = true;
    }
  }

  async onSubmit() {
    const email = this.user.email ?? this.authRoute.currentEmail();
    const newPassword = this.user.password;
    const code = this.user.code;

    if (!email || !newPassword || !code) {
      return;
    }

    this.processing.set(true);
    await this.#authService.confirmForgotPassword({
      email,
      code: String(code),
      newPassword,
    });

    this.processing.set(false);
  }
}
