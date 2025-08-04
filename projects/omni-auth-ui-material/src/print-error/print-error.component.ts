import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {ContentConfig, ErrorMessagePipe, FlowError} from '@ngx-tools/omni-auth-core';
import {MessageComponent} from '../ui/message/message.component';

@Component({
  selector: 'omni-auth-print-error',
  standalone: true,
  imports: [ErrorMessagePipe, MessageComponent],
  templateUrl: './print-error.component.html',
  styleUrl: 'print-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrintErrorComponent {
  source = input.required<FlowError['source']>();
  content = input.required<Pick<ContentConfig, 'errors'>>();
}
