import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {LoaderOverlayDirective} from '../loader/loader-overlay.directive';

@Component({
  selector: 'omni-auth-ui-mat-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    MatIconModule,
    LoaderOverlayDirective,
  ],
  templateUrl: './button.component.html',
  styleUrl: 'button.component.scss',
})
export class ButtonComponent {
  @Input() type?: 'primary' | 'secondary' = 'primary';
  @Input() icon?: string;
  @Input() iconOnly = false;
  @HostBinding('class.disabled') @Input() disabled = false;
  @Input() loading = false;
}
