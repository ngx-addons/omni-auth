export type JwtPayloadType = JwtPayloadStandardClaims & JsonObject;

/**
 * @description see https://tools.ietf.org/html/rfc7519#section-4.1 for standard JWT fields (claims)
 */
export type JwtPayloadStandardClaims = {
  /**
   * @description expires at (timestamp in seconds)
   */
  exp?: number;
  /**
   * @description issuer of the token (string or URI)
   */
  iss?: string;
  /**
   * @description audience(s) that the token is intended for (string or array of strings)
   */
  aud?: string | string[];
  /**
   * @description not before - time before which the token must not be accepted for processing (timestamp in seconds)
   */
  nbf?: number;
  /**
   * @description issued at - time at which the token was issued (timestamp in seconds)
   */
  iat?: number;
  /**
   * @description scope - space-separated list of scopes (string)
   */
  scope?: string;
  /**
   * @description JWT ID - unique identifier for the token (string)
   */
  jti?: string;
  /**
   * @description subject - usually a unique identifier of the user (string or URI)
   */
  sub?: string;
};

type JsonPrimitive = null | string | number | boolean;

type JsonArray = (JsonPrimitive | JsonObject | JsonArray)[];

type JsonObject = {
  [x: string]: JsonPrimitive | JsonArray | JsonObject;
};
