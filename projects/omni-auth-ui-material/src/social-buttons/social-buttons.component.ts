import {ChangeDetectionStrategy, Component, inject, input, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  ContentConfig, OmniAuthService, SocialProvider,
} from '@ngx-addons/omni-auth-core';
import {MatButton} from '@angular/material/button';
import {LoaderOverlayDirective} from '../ui/loader/loader-overlay.directive';
import {PrintErrorComponent} from '../print-error/print-error.component';


@Component({
  selector: 'omni-auth-ui-mat-social-buttons',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButton,
    LoaderOverlayDirective,
    PrintErrorComponent,
  ],
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialButtonsComponent {
  readonly content = input.required<Pick<ContentConfig, 'socialButtons' | 'common' | 'errors'>>();
  readonly error = signal<string | null>(null);
  readonly processing = signal<SocialProvider | null>(null);
  #authService = inject(OmniAuthService);

  readonly socialProviders = signal<{
    name: string,
    icon: string,
    key: SocialProvider,
  }[]>([
    {
      name: 'Google',
      icon: 'google',
      key: 'google',
    },
    // todo implement other providers
    // todo make it configurable
    // {
    //   name: 'Facebook',
    //   icon: 'facebook',
    //   key: 'facebook',
    // },
    // {
    //   name: 'Apple',
    //   icon: 'apple',
    //   key: 'apple',
    // },
    // {
    //   name: 'GitHub',
    //   icon: 'github',
    //   key: 'github',
    // },
    // {
    //   name: 'Microsoft',
    //   icon: 'microsoft',
    //   key: 'microsoft',
    // },
  ]);

  onSocialButtonClick = async (providerKey: SocialProvider) => {
    this.processing.set(providerKey);

    this.error.set(null);

    const response = await this.#authService.signInWithProvider(providerKey);

    this.processing.set(null);

    if (response) {
      this.error.set(this.content().errors[response.code] ?? this.content().errors.unknown);
    }
  }
}
