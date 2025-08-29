import { JwtToken } from './jwt-token';
import { JwtPayloadType } from './../types';

describe('JwtToken', () => {
  const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test';

  describe('constructor', () => {
    it('should create instance with token and payload', () => {
      const payload: JwtPayloadType = { exp: Math.floor(Date.now() / 1000) + 3600 };
      const jwtToken = new JwtToken(mockToken, payload);

      expect(jwtToken.token).toBe(mockToken);
      expect(jwtToken.payload).toBe(payload);
    });

    it('should set expireAt when exp is provided', () => {
      const exp = Math.floor(Date.now() / 1000) + 3600;
      const payload = { exp };
      const jwtToken = new JwtToken(mockToken, payload);

      expect(jwtToken.expireAt).toEqual(new Date(exp * 1000));
    });

    it('should set expireAt to null when exp is not provided', () => {
      const payload = {};
      const jwtToken = new JwtToken(mockToken, payload);

      expect(jwtToken.expireAt).toBeNull();
    });
  });

  describe('isExpired', () => {
    it('should return false when no exp in payload', () => {
      const payload = {};
      const jwtToken = new JwtToken(mockToken, payload);

      expect(jwtToken.isExpired()).toBe(false);
    });

    it('should return false when token is not expired', () => {
      const payload = { exp: Math.floor(Date.now() / 1000) + 3600 };
      const jwtToken = new JwtToken(mockToken, payload);

      expect(jwtToken.isExpired()).toBe(false);
    });

    it('should return true when token is expired', () => {
      const payload = { exp: Math.floor(Date.now() / 1000) - 3600 };
      const jwtToken = new JwtToken(mockToken, payload);

      expect(jwtToken.isExpired()).toBe(true);
    });
  });

  describe('isValid', () => {
    it('should return true when token is not expired', () => {
      const payload = { exp: Math.floor(Date.now() / 1000) + 3600 };
      const jwtToken = new JwtToken(mockToken, payload);

      expect(jwtToken.isValid()).toBe(true);
    });

    it('should return false when token is expired', () => {
      const payload = { exp: Math.floor(Date.now() / 1000) - 3600 };
      const jwtToken = new JwtToken(mockToken, payload);

      expect(jwtToken.isValid()).toBe(false);
    });
  });

  describe('toString', () => {
    it('should return the token string', () => {
      const payload = { exp: Math.floor(Date.now() / 1000) + 3600 };
      const jwtToken = new JwtToken(mockToken, payload);

      expect(jwtToken.toString()).toBe(mockToken);
    });
  });
});
