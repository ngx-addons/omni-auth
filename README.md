<div align="center">
  <a href="https://github.com/ngx-addons/omni-auth">
    <img src="https://avatars.githubusercontent.com/u/225275882" alt="Logo" height="150px">
  </a>
<h3 align="center" style="margin-bottom: 0; padding-bottom:0; border-bottom: 0">@ngx-addons</h3>
<h1 align="center" style="margin: 0; border-bottom: 0">omni-auth</h1>
  <p align="center">
    Angular authentication library providing core functionality for authentication flows, guards, and error handling.
    <br />
    <a href="https://ngx-addons.github.io/omni-auth/demo/cognito-with-material">Demo</a>
    ·
    <a href="https://ngx-addons.github.io/omni-auth/">Documentation</a>
    ·
    <a href="https://github.com/ngx-addons/omni-auth/issues/new/choose">Report Bug</a>
    ·
    <a href="https://github.com/ngx-addons/omni-auth/issues/new/choose">Request Feature</a>

![License MIT](https://img.shields.io/npm/l/%40ngx-addons%2Fomni-auth-core)
![Build & Tests](https://img.shields.io/github/actions/workflow/status/ngx-addons/omni-auth/pr-static-analysis.yml?label=Build%20%26%20Tests)
![Downloads](https://img.shields.io/npm/d18m/%40ngx-addons%2Fomni-auth-core)

  </p>
</div>

<div align="center">
<video src="https://github.com/user-attachments/assets/bca77916-a7ca-4d28-99ae-0c7d8d5e66cc" autoplay loop muted controls="false" />
</div>

## Quick Start

1. Install the package:
```bash
pnpm install @ngx-addons/omni-auth-core @ngx-addons/omni-auth-ui-material @ngx-addons/omni-auth-cognito
```

2. Configure the package:
```typescript
import { configureAuth } from "@ngx-addons/omni-auth-core";

//...
prociders: [
  configureAuthCognitoConnector({
    cognito: {
      userPoolId: environment.cognito.userPoolId,
      userPoolClientId: environment.cognito.userPoolClientId,
    },
  }),
  configureAuth({
    authService: AuthAwsCognitoService,
  })
]
//...
```

3. Use UI:

```html
<omni-auth-ui-mat></omni-auth-ui-mat>
```

## Documentation

[Documentation is available here](https://ngx-addons.github.io/omni-auth/).

## Key features
- **Zoneless**: Designed to work without Angular's NgZone for performance optimization
- **Configurable**: Flexible configuration system with default patterns
- **Routing Services**: Authentication-aware routing utilities
- **Authentication Guards**: Route protection with built-in auth guards
- **Error Handling**: Comprehensive error collection and messaging system
- **Type Safety**: Full TypeScript support with well-defined interfaces

## List of packages


| Package | Description | NPM Link | Downloads |
|---------|-------------|----------|----------|
| @ngx-addons/omni-auth-core | Core authentication library | [![NPM Version](https://img.shields.io/npm/v/%40ngx-addons%2Fomni-auth-core)](https://www.npmjs.com/package/@ngx-addons/omni-auth-core) | [![NPM Downloads](https://img.shields.io/npm/d18m/%40ngx-addons%2Fomni-auth-core)](https://www.npmjs.com/package/@ngx-addons/omni-auth-core) |
| @ngx-addons/omni-auth-ui-material | Material Design UI components for authentication | [![NPM Version](https://img.shields.io/npm/v/%40ngx-addons%2Fomni-auth-ui-material)](https://www.npmjs.com/package/@ngx-addons/omni-auth-ui-material) | [![NPM Downloads](https://img.shields.io/npm/d18m/%40ngx-addons%2Fomni-auth-ui-material)](https://www.npmjs.com/package/@ngx-addons/omni-auth-ui-material) |
| @ngx-addons/omni-auth-cognito | AWS Cognito connector for authentication | [![NPM Version](https://img.shields.io/npm/v/%40ngx-addons%2Fomni-auth-cognito)](https://www.npmjs.com/package/@ngx-addons/omni-auth-cognito) | [![NPM Downloads](https://img.shields.io/npm/d18m/%40ngx-addons%2Fomni-auth-cognito)](https://www.npmjs.com/package/@ngx-addons/omni-auth-cognito) |


## License

See the [LICENSE](LICENSE.md) file for details.
