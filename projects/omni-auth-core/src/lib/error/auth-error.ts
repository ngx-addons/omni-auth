export class OmniAuthError {
  constructor(public error: Error | unknown) {}

  getErrorMessage(): string {
    return this.error instanceof Error ? this.error.message : 'Unknown error';
  }
}
