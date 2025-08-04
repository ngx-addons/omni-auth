import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

export type MessageType = 'info' | 'warn';

@Component({
  selector: 'omni-auth-ui-mat-message',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './message.component.html',
  styleUrl: 'message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent {
  icon = input<'info' | string>();
  type = input<MessageType>('info');

  get iconBasedOnType() {
    switch (this.type()) {
      case 'info':
        return 'info';
      case 'warn':
        return 'warning';
    }
  }
}
