import {ChangeDetectionStrategy, Component, computed, inject, input, OnInit, ViewEncapsulation,} from '@angular/core';
import {AuthComponent, AuthComponentConfig,} from '@ngx-addons/omni-auth-ui-material';
import {NgDocThemeService} from '@ng-doc/app/services/theme';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'demo-cognito-with-material',
  imports: [AuthComponent],
  template: `
    <div
      class="material-demo mat-typography"
      [class]="[theme(), currentTheme()]"
    >
      <omni-auth-ui-mat [config]="config()">
        <p sign-up-footer>
          By signing up, you agree to our
          <a class="link" tabindex="0">terms and conditions</a>
        </p>
      </omni-auth-ui-mat>
    </div>
  `,
  styleUrls: ['cognito-with-material.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class CognitoWithMaterialComponent implements OnInit {
  protected readonly themeService = inject(NgDocThemeService);
  protected readonly iconRegistry = inject(MatIconRegistry);

  readonly theme = input<'blue' | 'azure' | 'green' | 'orange' | 'magenta'>(
    'green',
  );
  readonly providers = input<boolean>(true);
  readonly providersWithLabels = input<boolean>(true);
  readonly additionalConsent = input<boolean>(true);
  readonly withFullName = input<boolean>(true);
  readonly change = toSignal(this.themeService.themeChanges());
  readonly currentTheme = computed(() => {
    this.change();

    if (!this.themeService.currentTheme) {
      return 'light';
    }

    return this.themeService.currentTheme as 'auto' | 'dark';
  });

  readonly config = computed(() => {
    const withProviders = this.providers();
    const labels = this.providersWithLabels();
    const fullWidth = labels;
    const additionalConsent = this.additionalConsent();
    const withFullName = this.withFullName();

    const config: AuthComponentConfig = {
      signIn: {},
      signUp: {
        fullName: withFullName ? {
          enabled: true,
          enableAutoFill: true,
        } : undefined,
        additionalAttributes: additionalConsent ? [
          {
            key: 'newsletterConsent',
            type: 'checkbox',
            isRequired: false,
            label: 'Subscribe to our newsletter',
          },
        ] : [],
      },
    };

    const tooltip = 'This feature is not enabled in demo';
    if (withProviders) {
      config.signIn!.signInProviders = [
        {
          label: labels ? 'Continue with Google' : undefined,
          tooltip,
          key: 'google',
          fullWidth: fullWidth,
        },
        {
          label: labels ? 'Continue with Facebook' : undefined,
          tooltip,
          key: 'facebook',
          fullWidth: fullWidth,
        },
        {
          label: labels ? 'Continue with Apple' : undefined,
          tooltip,
          key: 'apple',
          fullWidth: fullWidth,
        },
        {
          label: labels ? 'Continue with Microsoft' : undefined,
          tooltip,
          key: 'github',
          fullWidth: fullWidth,
        },
        {
          label: labels ? 'Continue with Custom Provider' : undefined,
          tooltip,
          key: 'custom-provider',
          fullWidth: fullWidth,
        },
      ];
    }
    return config;
  });

  ngOnInit(): void {
    this.iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
