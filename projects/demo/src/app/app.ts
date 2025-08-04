import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {AuthComponent} from '@ngx-tools/omni-auth-ui-material';

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

  ngOnInit(): void {
    this.iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
