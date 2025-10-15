---
title: Additional Fields
keyword: CognitoWithMaterialPage
---

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





