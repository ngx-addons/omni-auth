import {ChangeDetectionStrategy, Component, inject, input, output, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputComponent} from '../ui/input/input.component';
import {
  AUTH_CONFIG,
  AuthConfig,
  AuthRouteService,
  ContentConfig,
  emailToFullName,
  OmniAuthService,
  patterns
} from '@ngx-addons/omni-auth-core';
import {ButtonComponent} from '../ui/button/button.component';
import {MatCheckbox} from '@angular/material/checkbox';
import {PrintErrorComponent} from '../print-error/print-error.component';

type AdditionalAttributeFieldConfig = {
  key: string;
  type: 'checkbox';
  label: string;
  isRequired: boolean
};

export type SignUpComponentConfig = {
  fullName?: {
    enabled: boolean,
    enableAutoFill?: boolean
  }
  additionalAttributes?: AdditionalAttributeFieldConfig[]
}

@Component({
  selector: 'omni-auth-ui-mat-signup',
  standalone: true,
  imports: [CommonModule, InputComponent, FormsModule, ButtonComponent, MatCheckbox, PrintErrorComponent],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', './../auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {
  #authService = inject<OmniAuthService>(OmniAuthService);
  #env = inject<AuthConfig>(AUTH_CONFIG);
  env = inject<AuthConfig>(AUTH_CONFIG);
  authRoute = inject(AuthRouteService);
  readonly processing = signal(false);
  readonly content = input.required<Pick<ContentConfig, 'signUp' | 'common' | 'errors'>>();
  readonly config = input<SignUpComponentConfig>();
  readonly termsAndConditions = output();

  #defaultIdentifierPattern = (this.#env.identifierType === 'email' ? patterns.emailPattern : patterns.usernamePattern);
  identifierPattern = this.#env.validation?.identifierPattern || this.#defaultIdentifierPattern;
  passwordPattern = this.#env.validation?.passwordPattern || patterns.passwordPattern;

  user: {
    identifier: string | null;
    password: string | null;
    tos: boolean;
    fullName: string | null;
    customAttributes: Record<string, string | boolean>;
  } = {
    identifier: null,
    password: null,
    tos: false,
    fullName: null,
    customAttributes: {}
  };

  async onSubmit() {
    const identifier = this.user.identifier ?? this.authRoute.currentIdentifier();
    const password = this.user.password;
    const fullName = this.user.fullName;
    const customAttributes = this.user.customAttributes;

    if (!identifier || !password) {
      return;
    }

    this.processing.set(true);

    await this.#authService.signUp({
      identifier,
      password,
      fullName: fullName ?? undefined,
      customAttributes,
    });

    this.processing.set(false);
  }

  updateUserIdentifier($event: string) {
    this.user.identifier = $event;

    if (!this.config()?.fullName?.enabled || !this.config()?.fullName?.enableAutoFill) {
      return;
    }

    const nextIdentifier = emailToFullName($event) || $event;
    if (nextIdentifier) {
      this.user.fullName = nextIdentifier
    }
  }

  updateUserAttribute(key: string, value: string | boolean) {
    if (!this.user.customAttributes) {
      this.user.customAttributes = {};
    }

    this.user.customAttributes[key] = value;
  }
}
