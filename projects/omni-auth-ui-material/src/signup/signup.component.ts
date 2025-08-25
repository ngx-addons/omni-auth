import {ChangeDetectionStrategy, Component, inject, input, output, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputComponent} from '../ui/input/input.component';
import {
  AUTH_CONFIG,
  AuthConfig,
  AuthRouteService,
  ContentConfig, emailToFullName,
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
  authRoute = inject(AuthRouteService);
  readonly processing = signal(false);
  readonly content = input.required<Pick<ContentConfig, 'signUp' | 'common' | 'errors'>>();
  readonly config = input<SignUpComponentConfig>();
  readonly termsAndConditions = output();

  emailPattern = this.#env.validation?.emailPattern || patterns.emailPattern;
  passwordPattern = this.#env.validation?.passwordPattern || patterns.passwordPattern;
  user: {
    tos: boolean;
    fullName: string | null;
    email: string | null;
    password: string | null;
    customAttributes: Record<string, string | boolean>;
  } = {
    tos: false,
    fullName: null,
    email: null,
    password: null,
    customAttributes: {}
  };

  async onSubmit() {
    const email = this.user.email ?? this.authRoute.currentEmail();
    const password = this.user.password;
    const fullName = this.user.fullName;
    const customAttributes = this.user.customAttributes;

    if (!email || !password) {
      return;
    }

    this.processing.set(true);

    await this.#authService.signUp({
      email,
      password,
      fullName: fullName ?? undefined,
      customAttributes,
    });

    this.processing.set(false);
  }

  updateUserEmail($event: string) {
    this.user.email = $event;

    if(!this.config()?.fullName?.enabled || !this.config()?.fullName?.enableAutoFill) {
      return;
    }

    const nextEmail = emailToFullName($event);
    if (nextEmail) {
      this.user.fullName = nextEmail
    }
  }

  updateUserAttribute(key: string, value: string | boolean) {
    if (!this.user.customAttributes) {
      this.user.customAttributes = {};
    }

    this.user.customAttributes[key] = value;
  }
}
