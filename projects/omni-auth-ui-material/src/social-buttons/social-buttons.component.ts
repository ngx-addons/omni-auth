import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ContentConfig,
  CustomSignInProviderKey,
  OmniAuthService,
  SignInProviderKey,
} from '@ngx-addons/omni-auth-core';
import { MatButton } from '@angular/material/button';
import { LoaderOverlayDirective } from '../ui/loader/loader-overlay.directive';
import { PrintErrorComponent } from '../print-error/print-error.component';
import {MatTooltipModule} from '@angular/material/tooltip';

export type SignInProvider = {
  /**
   *  @description Key used to identify the social provider in the OmniAuthService.
   */
  key: SignInProviderKey;

  /**
   *  @description Label on button, e.g. 'Continue with Google', 'Sign in with Facebook', etc.
   */
  label?: string;

  /**
   *  @description Tooltip text that appears when hovering over the button.
   */
  tooltip?: string;

  /**
   *  @description Icon configuration for the social provider button. Preferably, use SVG icons for better scalability.
   */
  icon?: {
    src: string;
    alt: string;
  };

  fullWidth?: boolean;
};

@Component({
  selector: 'omni-auth-ui-mat-social-buttons',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButton,
    LoaderOverlayDirective,
    PrintErrorComponent,
    NgOptimizedImage,
    MatTooltipModule,
  ],
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialButtonsComponent {
  readonly content =
    input.required<
      Pick<ContentConfig, 'socialButtons' | 'common' | 'errors'>
    >();
  readonly error = signal<string | null>(null);
  readonly processing = signal<CustomSignInProviderKey | null>(null);
  #authService = inject(OmniAuthService);

  readonly signInProviders = input.required<SignInProvider[]>();

  onSocialButtonClick = async (provider: SignInProvider) => {
    this.processing.set(provider.key);

    this.error.set(null);

    const response = await this.#authService.signInWithProvider(provider.key);

    this.processing.set(null);

    if (response) {
      this.error.set(
        this.content().errors[response.code] ?? this.content().errors.unknown,
      );
    }
  };
  protected readonly name = name;
}
