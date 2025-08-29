import { TokenFetcher, TokenProxy } from './token-proxy';
import { JwtToken } from './jwt-token';
import { JwtPayloadType } from './../types';

describe('TokenProxy', () => {
  let tokenProxy: TokenProxy;
  let fetcher: TokenFetcher;
  const pastDate = 1740859959; // Saturday, 1 March 2025 20:12:39

  it('should be created', () => {
    fetcher = async () => {
      return null;
    };

    tokenProxy = new TokenProxy(fetcher);

    expect(tokenProxy).toBeTruthy();
  });

  it('should return token', async () => {
    fetcher = async () => {
      return {
        idToken: new JwtToken('test-id-token', {} as JwtPayloadType),
        accessToken: new JwtToken('test-access-token', {} as JwtPayloadType),
      };
    };

    tokenProxy = new TokenProxy(fetcher);

    const token = await tokenProxy.getIdToken();
    expect(token?.toString()).toEqual('test-id-token');

    const accessToken = await tokenProxy.getAccessToken();
    expect(accessToken?.toString()).toEqual('test-access-token');
  });


  it('should refresh token', async () => {
    const fetcherSpy = jasmine.createSpy('fetcher');
    fetcherSpy.and.returnValue({
      idToken: new JwtToken('test-id-token', {exp: pastDate} as JwtPayloadType),
      accessToken: new JwtToken('test-access-token', {exp: pastDate} as JwtPayloadType),
    });

    tokenProxy = new TokenProxy(fetcherSpy);
    await tokenProxy.getIdToken();

    expect(fetcherSpy).toHaveBeenCalledTimes(2);

    tokenProxy = new TokenProxy(fetcherSpy);
    await tokenProxy.getAccessToken();

    expect(fetcherSpy).toHaveBeenCalledTimes(4);
  });


  it('should refresh token', async () => {
    const fetcherSpy = jasmine.createSpy('fetcher');
    fetcherSpy.and.returnValue({
      idToken: new JwtToken('test-id-token', {exp: pastDate} as JwtPayloadType),
      accessToken: new JwtToken('test-access-token', {} as JwtPayloadType),
    });

    tokenProxy = new TokenProxy(fetcherSpy);
    await tokenProxy.getIdToken();

    expect(fetcherSpy).toHaveBeenCalledTimes(2);
  });
});
