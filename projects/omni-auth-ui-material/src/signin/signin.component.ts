import {ChangeDetectionStrategy, Component, inject, input, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputComponent} from '../ui/input/input.component';
import {
  AUTH_CONFIG,
  AuthConfig,
  AuthRouteService,
  ContentConfig,
  OmniAuthService, patterns,
} from '@ngx-tools/omni-auth-core';
import {ButtonComponent} from '../ui/button/button.component';
import {SocialButtonsComponent} from '../social-buttons/social-buttons.component';
import {PrintErrorComponent} from '../print-error/print-error.component';

@Component({
  selector: 'omni-auth-ui-mat-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent, ButtonComponent, SocialButtonsComponent, PrintErrorComponent],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss', './../auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {
  #authService = inject(OmniAuthService);
  #authRoute = inject(AuthRouteService);
  #env = inject<AuthConfig>(AUTH_CONFIG);

  readonly content = input.required<Pick<ContentConfig, 'signIn' | 'socialButtons' | 'common' | 'errors'>>();
  readonly processing = signal(false);

  get currentEmail() {
    return this.#authRoute.currentEmail;
  }

  user = {
    email: null,
    password: null,
  };
  emailPattern = this.#env.validation?.emailPattern || patterns.emailPattern;
  passwordPattern = this.#env.validation?.passwordPattern || patterns.passwordPattern;

  async onSubmit() {
    const email = this.user.email ?? this.#authRoute.currentEmail();
    const password = this.user.password;

    if (!email || !password) {
      return;
    }

    this.processing.set(true);
    await this.#authService.signIn({
      email,
      password,
    });

    this.processing.set(false);
  }

  navigateToReset() {
    this.#authRoute.nextStep(
      'reset_password',
      this.user.email ? {email: this.user.email} : undefined
    )
  }
}
