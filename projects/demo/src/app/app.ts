import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {AuthComponent} from '@ngx-tools/omni-auth-ui-material';
import {AUTH_SERVICE, OmniAuthService} from '@ngx-tools/omni-auth-core';

@Component({
  selector: 'demo-root',
  imports: [
    AuthComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  protected readonly title = signal('demo');
  protected iconRegistry = inject(MatIconRegistry);
  authService = inject<OmniAuthService>(AUTH_SERVICE);

  ngOnInit(): void {
    this.iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
