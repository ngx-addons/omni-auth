import { JwtToken } from './jwt-token';

export type TokenFetcher<
  ID_TOKEN_PAYLOAD_CLAIMS = unknown,
  ACCESS_TOKEN_PAYLOAD_CLAIMS = unknown,
> = (refresh: boolean) => Promise<{
  idToken: JwtToken<ID_TOKEN_PAYLOAD_CLAIMS>;
  accessToken: JwtToken<ACCESS_TOKEN_PAYLOAD_CLAIMS>;
} | null>;

export class TokenProxy<
  ID_TOKEN_PAYLOAD_CLAIMS = unknown,
  ACCESS_TOKEN_PAYLOAD_CLAIMS = unknown,
> {
  constructor(
    protected fetcher: TokenFetcher<
      ID_TOKEN_PAYLOAD_CLAIMS,
      ACCESS_TOKEN_PAYLOAD_CLAIMS
    >,
  ) {}

  async getIdToken(): Promise<JwtToken<ID_TOKEN_PAYLOAD_CLAIMS> | null> {
    const tokens = await this.fetcher(false);

    const idToken = tokens?.idToken;

    if (!idToken) {
      return null;
    }

    if (idToken.isValid()) {
      return idToken;
    }

    const freshTokens = await this.fetcher(true);
    const freshIdToken = freshTokens?.idToken;

    if (!freshIdToken) {
      return null;
    }

    return freshIdToken;
  }

  async getAccessToken(): Promise<JwtToken<ACCESS_TOKEN_PAYLOAD_CLAIMS> | null> {
    const tokens = await this.fetcher(false);

    const accessToken = tokens?.accessToken;

    if (!accessToken) {
      return null;
    }

    if (accessToken.isValid()) {
      return accessToken;
    }

    const freshTokens = await this.fetcher(true);
    const freshAccessToken = freshTokens?.accessToken;

    if (!freshAccessToken) {
      return null;
    }

    return freshAccessToken;
  }
}
