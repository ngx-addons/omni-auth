import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoaderOverlayDirective } from '../loader/loader-overlay.directive';

@Component({
  selector: 'omni-auth-ui-mat-button',
  standalone: true,
  imports: [CommonModule, MatButton, MatIconModule, LoaderOverlayDirective],
  templateUrl: './button.component.html',
  styleUrl: 'button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly buttonType = input<'submit' | 'reset' | 'button'>('button');
  readonly type = input<'primary' | 'secondary'>('primary');
  readonly icon = input<string>();
  readonly iconOnly = input(false);
  readonly loading = input(false);
  @HostBinding('class.disabled') @Input() disabled = false;
}
