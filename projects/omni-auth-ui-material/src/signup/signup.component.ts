import {ChangeDetectionStrategy, Component, inject, input, Input, output, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputComponent} from '../ui/input/input.component';
import {
  AUTH_CONFIG,
  AuthConfig,
  AuthRouteService,
  ContentConfig,
  OmniAuthService,
  patterns,
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
  termsAndConditions = output();

  emailPattern = this.#env.validation?.emailPattern || patterns.emailPattern;
  passwordPattern = this.#env.validation?.passwordPattern || patterns.passwordPattern;
  user: {
    tos: boolean;
    name: string | null;
    email: string | null;
    password: string | null;
    attributes: Record<string, string | boolean>;
  } = {
    tos: false,
    name: null,
    email: null,
    password: null,
    attributes: {}
  };

  async onSubmit() {
    const email = this.user.email ?? this.authRoute.currentEmail();
    const password = this.user.password;
    const name = this.user.name;
    const attributes = this.user.attributes;

    if (!name || !email || !password) {
      return;
    }

    this.processing.set(true);
    await this.#authService.signUp({
      email,
      password,
      name,
      attributes,
    });

    this.processing.set(false);
  }

  updateUserEmail($event: string) {
    this.user.email = $event;
    const emailParts = $event.split('@');

    if (emailParts.length === 2) {
      this.user.name = $event.split('@')[0];
    }
  }

  updateUserAttribute(key: string, value: string | boolean) {
    if (!this.user.attributes) {
      this.user.attributes = {};
    }

    this.user.attributes[key] = value;
  }
}
