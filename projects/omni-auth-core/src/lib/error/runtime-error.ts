import {OmniAuthError} from "./auth-error";

export class RuntimeError extends OmniAuthError {
  constructor(
    public override error: Error | unknown,
    public possibleSolution?: string,
  ) {
    super(error);
  }
}
