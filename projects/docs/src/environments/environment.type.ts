export type EnvironmentType = {
  cognito: {
    userPoolId: string;
    userPoolClientId: string;
    userPoolDomain: string;
  };
  supabase: {
    url: string;
    publishableKey: string;
  };
  apiTestingUrl: string;
  redirectSignIn: string;
  redirectSignOut: string;
};
