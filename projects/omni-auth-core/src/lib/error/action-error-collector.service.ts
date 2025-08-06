import {Injectable, Signal, signal} from '@angular/core';
import {FlowError} from './flow-error';

@Injectable({
  providedIn: 'root',
})
export class ActionErrorCollectorService {
  readonly #currentError = signal<FlowError | null>(null);

  readonly currentError: Signal<FlowError | null> = this.#currentError;

  reset() {
    this.#currentError.set(null)
  }

  handle(error: FlowError) {
    this.#currentError.set(error);
  }
}
