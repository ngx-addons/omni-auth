---
title: Username And Password
keyword: CognitoWithMaterialPage
---

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





