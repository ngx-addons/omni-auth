export type EnvironmentType = {
  cognito: {
    userPoolId: string;
    userPoolClientId: string;
    userPoolDomain: string;
  };
  cognitoUsername: {
    userPoolId: string;
    userPoolClientId: string;
    userPoolDomain: string;
  };
  apiTestingUrl: string;
  redirectSignIn: string;
  redirectSignOut: string;
};
