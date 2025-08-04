import {
  AfterViewInit,
  Component,
  inject,
  Injector,
  Input,
} from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { HostStateMatcher } from './error-state-matcher';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'omni-auth-ui-mat-form-control-abstract',
  template: '',
})
export class FormControlAbstractComponent<Value> implements AfterViewInit {
  @Input({ required: true }) label!: string;
  @Input() hint?: string;

  onChangeLocalValue(value: Value) {
    this.value = value;
    this.onChange?.(value);
  }

  onChange?: (_: Value) => void;
  onTouched?: () => void;
  value?: Value;
  disabled = false;
  injector = inject(Injector);
  errorStateMatcher = new ErrorStateMatcher();

  ngAfterViewInit() {
    this.errorStateMatcher = HostStateMatcher.fromNgControl(
      this.injector.get(NgControl),
    );
  }

  writeValue(value: Value): void {
    this.value = value;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
