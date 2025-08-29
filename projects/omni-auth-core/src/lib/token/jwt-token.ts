import { JwtPayloadType } from '../types';

export class JwtToken<ADDITIONAL_PAYLOAD_CLAIMS = unknown> {
  expireAt: Date | null;

  constructor(
    public token: string,
    public payload: JwtPayloadType & ADDITIONAL_PAYLOAD_CLAIMS,
  ) {
    this.expireAt = payload.exp ? new Date(payload.exp * 1000) : null;
  }

  isExpired(): boolean {
    if (!this.payload.exp) {
      return false;
    }
    const now = Math.floor(Date.now() / 1000);

    return this.payload.exp < now;
  }

  isValid(): boolean {
    return !this.isExpired();
  }

  toString(): string {
    return this.token;
  }
}
