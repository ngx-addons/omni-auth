import {computed, inject, Pipe, PipeTransform, Signal} from '@angular/core';
import {ActionErrorCollectorService} from '../error/action-error-collector.service';
import {FlowError} from '../error/flow-error';
import {ContentConfig} from './../config/default-content.config';

@Pipe({name: 'errorMessage', standalone: true})
export class ErrorMessagePipe implements PipeTransform {
  #collector = inject(ActionErrorCollectorService);

  transform(source: FlowError['source'], messages: ContentConfig['errors']): Signal<string | null> {
    return computed(() => {
      const error = this.#collector.currentError();

      if (!error) {
        return null;
      }

      if (error.source !== source) {
        return null;
      }

      if (error.silent) {
        return null;
      }

      return messages[error.code] ?? messages.unknown;
    })
  }
}
