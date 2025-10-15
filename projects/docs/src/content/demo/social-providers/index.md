---
title: Social Providers
keyword: CognitoWithMaterialPage
---

## Social providers

Use following configuration to enable social providers.
```html
<omni-auth-ui-mat [config]="{
      signIn: {
        signInProviders: [
          google: {
            label: 'Continue with Google',
            tooltip: 'Autheticate with Google',
            key: 'google',
          },
          google: {
            label: 'Continue with Facebook',
            tooltip: 'Autheticate with Facebook',
            key: 'facebook',
          },
          custom: {
            label: 'Continue with MyApp',
            tooltip: 'Autheticate with MyApp',
            key: 'custom',
          },
        ]
      },
      signUp: {},
    }">
</omni-auth-ui-mat>

```
{{ NgDocActions.playground("CognitoWithMaterialProviders") }}
