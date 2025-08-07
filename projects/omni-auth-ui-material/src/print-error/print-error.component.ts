import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {ContentConfig, ErrorMessagePipe, FlowError} from '@ngx-addons/omni-auth-core';
import {MessageComponent} from '../ui/message/message.component';

@Component({
  selector: 'omni-auth-ui-mat-print-error',
  standalone: true,
  imports: [ErrorMessagePipe, MessageComponent],
  templateUrl: './print-error.component.html',
  styleUrl: 'print-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrintErrorComponent {
  readonly source = input.required<FlowError['source']>();
  readonly content = input.required<Pick<ContentConfig, 'errors'>>();
}
