import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {
  ContentConfig,
  OmniAuthService
} from '@ngx-tools/omni-auth-core';
import {MessageComponent} from '../ui/message/message.component';
import {ButtonComponent} from '../ui/button/button.component';
import {ReplacePipe} from '../ui/replace.pipe';
import {PrintErrorComponent} from '../print-error/print-error.component';

@Component({
  selector: 'omni-auth-ui-mat-authenticated',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MessageComponent,
    ButtonComponent,
    ReplacePipe,
    PrintErrorComponent,
  ],
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss', './../auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticatedComponent {
  authService = inject(OmniAuthService);
  readonly content = input.required<Pick<ContentConfig, 'loggedIn' | 'errors'>>();
}
