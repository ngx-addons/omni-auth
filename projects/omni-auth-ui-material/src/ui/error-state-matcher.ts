import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, NgControl } from '@angular/forms';

export class HostStateMatcher implements ErrorStateMatcher {
  constructor(private parentFormControl: FormControl) {}

  isErrorState(): boolean {
    return (
      this.parentFormControl &&
      this.parentFormControl.invalid &&
      (this.parentFormControl.dirty || this.parentFormControl.touched)
    );
  }

  static fromNgControl(control: NgControl): ErrorStateMatcher {
    if (control.control instanceof FormControl) {
      return new HostStateMatcher(control.control as FormControl);
    }

    return new ErrorStateMatcher();
  }
}
