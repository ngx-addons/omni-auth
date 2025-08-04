import {Injectable, Signal, signal} from '@angular/core';
import {FlowError} from './flow-error';

@Injectable({
  providedIn: 'root',
})
export class ActionErrorCollectorService {
  #currentError = signal<FlowError | null>(null);

  currentError: Signal<FlowError | null> = this.#currentError;

  reset() {
    this.#currentError.set(null)
  }


  handle(error: FlowError) {
    this.#currentError.set(error);
  }
}
