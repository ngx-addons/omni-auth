import {ChangeDetectionStrategy, Component, computed, inject, input, OnInit, ViewEncapsulation,} from '@angular/core';
import {AuthComponent, AuthComponentConfig,} from '@ngx-addons/omni-auth-ui-material';
import {NgDocThemeService} from '@ng-doc/app/services/theme';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatIconRegistry} from '@angular/material/icon';
import {configureAuth} from '@ngx-addons/omni-auth-core';
import {AuthAwsCognitoService, configureAuthCognitoConnector} from '@ngx-addons/omni-auth-cognito';
import {environment} from '../../environments/environment';

@Component({
  selector: 'demo-cognito-with-material-providers',
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  providers: [
    configureAuth({
      authService: AuthAwsCognitoService,
    }),
    configureAuthCognitoConnector({
      cognito: {
        userPoolId: environment.cognito.userPoolId,
        userPoolClientId: environment.cognito.userPoolClientId,
        oauth: {
          domain: environment.cognito.userPoolDomain,
          redirectSignIn: [environment.redirectSignIn],
          redirectSignOut: [environment.redirectSignOut],
          providers: ['Google'],
        },
      },
    }),
  ]
})
export class CognitoWithMaterialProvidersComponent implements OnInit {
  protected readonly themeService = inject(NgDocThemeService);
  protected readonly iconRegistry = inject(MatIconRegistry);

  readonly theme = input<'blue' | 'azure' | 'green' | 'orange' | 'magenta'>(
    'azure',
  );
  readonly providersWithLabels = input<boolean>(true);
  readonly google = input<boolean>(true);
  readonly custom = input<boolean>(true);
  readonly github = input<boolean>(true);
  readonly facebook = input<boolean>(true);
  readonly apple = input<boolean>(true);

  readonly change = toSignal(this.themeService.themeChanges());
  readonly currentTheme = computed(() => {
    this.change();

    if (!this.themeService.currentTheme) {
      return 'light';
    }

    return this.themeService.currentTheme as 'auto' | 'dark';
  });

  readonly config = computed(() => {
    const labels = this.providersWithLabels();
    const google = this.google();
    const facebook = this.facebook();
    const apple = this.apple();
    const github = this.github();
    const custom = this.custom();
    const fullWidth = labels;
    const tooltip = 'This feature is not enabled in demo';

    const config: AuthComponentConfig = {
      signIn: {
        signInProviders: [
          google ? {
            label: labels ? 'Continue with Google' : undefined,
            tooltip,
            key: 'google',
            fullWidth: fullWidth,
          } : undefined,
          facebook ? {
            label: labels ? 'Continue with Facebook' : undefined,
            tooltip,
            key: 'facebook',
            fullWidth: fullWidth,
          } : undefined,
          apple ? {
            label: labels ? 'Continue with Apple' : undefined,
            tooltip,
            key: 'apple',
            fullWidth: fullWidth,
          } : undefined,
          github ? {
            label: labels ? 'Continue with Microsoft' : undefined,
            tooltip,
            key: 'github',
            fullWidth: fullWidth,
          } : undefined,
          custom ? {
            label: labels ? 'Continue with Custom Provider' : undefined,
            tooltip,
            key: 'custom',
            fullWidth: fullWidth,
          } : undefined,
        ].filter(item => !!item)
      },
      signUp: {},
    };
    return config;
  });

  ngOnInit(): void {
    this.iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
