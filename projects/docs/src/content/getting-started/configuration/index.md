---
keyword: configuration
---

Configuration is divided into the following categories:


- Core configuration: general configuration of the library.
- Connector configuration: configure the way how the library communicates with the server.
- View configuration: configuration of the UI components.

## Core configuration

To set up the core configuration, use `configureAuth` method like in the example below. 

```typescript

import {configureAuth} from '@ngx-addons/omni-auth-core';

providers: [
  // ... other providers
  configureAuth({
    authService: AuthAwsCognitoService, // minimal configuration
    identifierType: 'email',
    bearerAuthentication: {
      //...
    },
    validation: {
      //...
    },
    routing: {
      //...
    },
    //...
  }),
]
```

> **Note**
> See `AuthConfig` reference to learn more about all configuration options.

## Connector configuration

Connectors are also set up using provider configuration. Each connector has its own configuration. See the below sections for more information.

### AWS Cognito connector

To set up the AWS Cognito connector configuration, use `configureAuthCognitoConnector` method like in the example below.

```
import {AuthAwsCognitoService, configureAuthCognitoConnector} from '@ngx-addons/omni-auth-cognito';

providers: [
  // ... other providers
    configureAuthCognitoConnector({
      cognito: {
        userPoolId: environment.cognito.userPoolId,
        userPoolClientId: environment.cognito.userPoolClientId,
      },
    }),
]
```

> **Note**
> See `AuthCognitoConfig` reference to learn more about all configuration options.


## View configuration

To set up the view configuration, use component input properties.

### Content configuration

Content configuration is used to control translation and content of the view.

```html
<omni-auth-ui-mat [content]="content"></omni-auth-ui-mat>
```
Where `content` is an object that implements `ContentConfig` interface. You can extend built-in const (`defaultContentEmail`).

### Content projection

There are several "slots" that can be used to inject custom content. See the below example.

```html
<omni-auth-ui-mat>
  <p sign-up-footer>
    By signing up, you agree to our
    <a class="link" tabindex="0">terms and conditions</a>
  </p>
</omni-auth-ui-mat>
```

Here is the list of available slots:
- sign-in-footer
- sign-up-footer
- auth-user-is-authenticated
- auth-header
- auth-footer


### General configuration

Other configuration options are available within the config input property. See `AuthComponentConfig` to learn more.

```typescript

const config: AuthComponentConfig = {
  hideAuthenticatedContent: true,
  signIn: {
    signInProviders: [
      {
        label: 'Continue with Google',
        tooltip: 'Login with Google',
        key: 'google',
      },
      {
        key: 'custom',
        label: "Login with custom provider",
      }
    ]
  },
  signUp: {
    additionalAttributes: [
      {
        key: 'newsletterConsent',
        type: 'checkbox',
        isRequired: false,
        label: 'Subscribe to our newsletter',
      },
      {
        key: 'termsAndConditionsConsent',
        type: 'checkbox',
        isRequired: true,
        label: 'Accept terms and conditions',
      },
    ],
  },
};
```


See the `*CognitoWithMaterialPage` article for more details
