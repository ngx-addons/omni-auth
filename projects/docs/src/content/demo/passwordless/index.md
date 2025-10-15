---
title: Passwordless
keyword: CognitoWithMaterialPage
---

Use the following configuration to enable passwordless flow:

```typescript
{
  providers: [
    configureAuth({
      authService: AuthAwsCognitoService,
      passwordlessEnabled: true // add this line
    }),
    configureAuthCognitoConnector({
      cognito: {
        userPoolId: environment.cognito.userPoolId,
        userPoolClientId: environment.cognito.userPoolClientId,
      }
    }),
  ]
}
```

{{ NgDocActions.playground("CognitoWithMaterialPasswordless") }}





