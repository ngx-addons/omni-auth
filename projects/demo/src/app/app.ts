import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { AuthComponent, AuthComponentConfig } from '@ngx-addons/omni-auth-ui-material';
import { OmniAuthService } from '@ngx-addons/omni-auth-core';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'demo-root',
  imports: [AuthComponent, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  protected readonly title = signal('demo');
  protected iconRegistry = inject(MatIconRegistry);
  authService = inject(OmniAuthService);

  config: AuthComponentConfig = {
    signIn: {
      signInProviders: [
        {
          label: 'Google',
          tooltip: 'Sign in with Google',
          key: 'google',
        },
        {
          label: 'Facebook',
          tooltip: 'Sign in with Facebook',
          key: 'facebook',
        },
        {
          label: 'Apple',
          tooltip: 'Sign in with Apple',
          key: 'apple',
        },
        {
          label: 'GitHub',
          tooltip: 'Sign in with GitHub',
          key: 'github',
        },
        {
          label: 'Custom Provider',
          tooltip: 'Sign in with a custom provider',
          key: 'custom-provider',
        },
      ],
    },
    signUp: {
      additionalAttributes: [
        {
          key: 'newsletterConsent',
          type: 'checkbox',
          isRequired: true,
          label: 'Subscribe to our newsletter',
        },
      ],
    },
  };

  ngOnInit(): void {
    this.iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
