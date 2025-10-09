---
title: Prerequisites
keyword: CognitoWithMaterialPage
---

Here you will find a demo of using AWS Cognito with Angular Material components. 
You can sign up, confirm your account, and log in using the provided forms.

> **Note**
> You will find source codes of all examples in [GitHub repository](https://github.com/ngx-addons/omni-auth/tree/main/projects/docs/src/demos).


## Accounts to try

> **Warning**
> Self-signup is disabled in the demo.
> 
> The demo is set up to use only email and password authentication.


| Email                         | Name        | Password  | Note              |
|-------------------------------|-------------|-----------|-------------------|
| nightingale37210@mailshan.com | Nate Blaese | Ml#QttQt6 | Confirmed account | |
| toucan86975@mailshan.com      | Astrid Lynn | om@n*H!00 | Confirmed account | |


| Email                             | Name             | Note                                                                       |
|-----------------------------------|------------------|----------------------------------------------------------------------------|
| ngx-omni-auth-user-01@maildrop.cc | Marianne Bentley | See inbox [here](https://maildrop.cc/inbox/?mailbox=ngx-omni-auth-user-03) |
| ngx-omni-auth-user-02@maildrop.cc | Travis Ibarra    | See inbox [here](https://maildrop.cc/inbox/?mailbox=ngx-omni-auth-user-02) |
| ngx-omni-auth-user-03@maildrop.cc | Lois Drake       | See inbox [here](https://maildrop.cc/inbox/?mailbox=ngx-omni-auth-user-03) |


> **Note**
> Pro tip: use the light/dark mode toggle in the top-right corner of the demo to see the demo in both light and dark mode.

## Email / Password

This is the default configuration. It uses email and password authentication.

{{ NgDocActions.playground("CognitoWithMaterialEmail") }}

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

## Additional fields

Use the following configuration to add additional fields to the sign-up form.

```html
<omni-auth-ui-mat [config]="{
      signIn: {},
      signUp: {
        attributes: [
          {
            key: 'phone',
            type: 'phone',
            validation: {
              isRequired: true,
            },
            content: {
              placeholder: '+12 345 678 9012',
              label: 'Phone Number',
              requiredText: 'This field is required',
              minLengthText: 'Phone number must be at least 10 characters long',
              maxLengthText: 'Phone number must be at most 15 characters long',
              patternText: 'Phone number must be a valid phone number',
            }
          },
          {
            key: 'fullName',
            type: 'text',
            validation: {
              isRequired: true,
              minLength: 2,
              maxLength: 255,
              pattern: new RegExp(/^[a-zA-Z0-9_.-]*$/),
            },
            content: {
              label: 'Full name',
              requiredText: 'Full name is required',
              minLengthText: 'Full name needs to be at least 2 characters long',
              maxLengthText: 'Full name can be maximum 255 characters long',
              placeholder: 'Joe Doe',
              patternText: 'Full name must be a valid name',
            }
          },
          {
            key: 'newsletterConsent',
            type: 'checkbox',
            validation: {
              isRequired: true,
            },
            content: {
              label: 'Subscribe to our newsletter',
              requiredText: 'This field is required',
            }
          },
        ],
      },
    }">
</omni-auth-ui-mat>
```

{{ NgDocActions.playground("CognitoWithMaterialAdditionalFields") }}

## Username / Password

Simply provide config during core configuration:

```typescript
{
  providers: [
    configureAuth({
      identifierType: 'username',
      authService: AuthAwsCognitoService,
    }),
  ]
}
```

{{ NgDocActions.playground("CognitoWithMaterialUsername") }}





