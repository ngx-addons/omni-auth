import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {AuthComponent} from '@ngx-addons/omni-auth-ui-material';
import {OmniAuthService} from '@ngx-addons/omni-auth-core';

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
  authService = inject(OmniAuthService);

  ngOnInit(): void {
    this.iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
