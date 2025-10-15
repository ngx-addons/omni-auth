import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ButtonComponent} from '../ui/button/button.component';
import {MessageComponent} from '../ui/message/message.component';
import {
  AUTH_CONFIG,
  AuthConfig,
  AuthRouteService,
  ContentConfig, OmniAuthService,
  patterns,
} from '@ngx-addons/omni-auth-core';
import {PrintErrorComponent} from '../print-error/print-error.component';
import {InputComponent} from '../ui/input/input.component';

@Component({
  selector: 'omni-auth-ui-mat-confirm-signin',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    FormsModule,
    MessageComponent,
    ButtonComponent,
    PrintErrorComponent,
    InputComponent,
  ],
  templateUrl: './confirm-signin.component.html',
  styleUrls: ['./confirm-signin.component.scss', '../auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmSigninComponent {
  authRoute = inject(AuthRouteService);
  #authService = inject(OmniAuthService);
  #env = inject<AuthConfig>(AUTH_CONFIG);
  readonly content =
    input.required<
      Pick<ContentConfig, 'confirmationSignIn' | 'common' | 'errors'>
    >();

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

  readonly processing = signal(false);

  async onSubmit() {
    const identifier = this.user.identifier ?? this.authRoute.currentIdentifier();
    const code = this.user.code;

    if (!identifier || !code) {
      return;
    }

    this.processing.set(true);
    await this.#authService.confirmSignIn({
      identifier,
      code: String(code),
    });

    this.processing.set(false);
  }
}
