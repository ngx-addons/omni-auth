<div align="center">
  <a href="https://github.com/ngx-addons/omni-auth">
    <img src="https://avatars.githubusercontent.com/u/225275882" alt="Logo" height="150px">
  </a>
<h3 align="center" style="margin-bottom: 0; padding-bottom:0; border-bottom: 0">@ngx-addons</h3>
<h1 align="center" style="margin: 0; border-bottom: 0">omni-auth</h1>
  <p align="center">
    The universal Angular authentication library. One API, multiple providers, production-ready UI — add complete auth to your Angular app in minutes, not weeks.
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

## What is omni-auth?

**@ngx-addons/omni-auth** is a modular, provider-agnostic authentication library for Angular. It gives you a single, unified API for sign-up, sign-in, password reset, social login, passwordless authentication, and more — regardless of which backend you use. Swap providers without rewriting your auth logic or UI.

Built for **Angular 20+** with a **zoneless-first** architecture and **RxJS** at its core, omni-auth is designed for the modern Angular ecosystem.

## Who is this for?

**Use omni-auth if you are:**

- **An Angular developer** who needs authentication but doesn't want to build forms, flows, guards, error handling, and token management from scratch.
- **A team or startup** shipping a product fast — omni-auth gives you a complete, polished authentication experience with a single component: `<omni-auth-ui-mat>`.
- **An enterprise team** that needs to switch or support multiple auth providers (AWS Cognito today, Supabase tomorrow) without rewriting frontend code.
- **A freelancer or agency** building client projects — drop in a battle-tested auth system and focus on the business logic that matters.
- **A developer who values clean architecture** — omni-auth separates concerns into core logic, provider connectors, and UI packages so you can use only what you need.

## When should you use omni-auth?

| Scenario                                                       | omni-auth helps you                                                                         |
|----------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| Starting a new Angular project that needs user authentication  | Get a complete auth flow running in minutes with pre-built Material Design UI components    |
| Migrating from one auth provider to another                    | Swap the connector package — your UI and business logic stay untouched                      |
| Building a SaaS, dashboard, or internal tool                   | Full support for sign-up, sign-in, password reset, MFA, social login, and passwordless auth |
| Need social login (Google, Facebook, Apple, GitHub, Microsoft) | Built-in social provider buttons with configurable providers per connector                  |
| Want to support passwordless / OTP authentication              | First-class passwordless support — just enable it in config                                 |
| Prototyping or building an MVP quickly                         | One component, three lines of config — authentication done                                  |

## Quick Start

1. Install the packages:

```bash
pnpm install @ngx-addons/omni-auth-core @ngx-addons/omni-auth-ui-material @ngx-addons/omni-auth-cognito
```

2. Configure authentication:

```typescript
import {configureAuth} from "@ngx-addons/omni-auth-core";

//...
providers: [
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

3. Add the UI component:

```html

<omni-auth-ui-mat></omni-auth-ui-mat>
```

That's it — you have a fully functional authentication flow with sign-in, sign-up, password reset, and more.

## Key Features

- **Provider-Agnostic** — Write your auth logic once, connect any supported backend (AWS Cognito, Supabase, and more coming)
- **Production-Ready UI** — Beautiful Material Design components for every auth flow out of the box
- **Zoneless Architecture** — Built for Angular's zoneless future, optimized for performance
- **Complete Auth Flows** — Sign-up, sign-in, confirm sign-up, confirm sign-in (MFA/OTP), password reset, change password, and sign-out
- **Social Authentication** — Google, Facebook, Apple, GitHub, Microsoft, and custom providers
- **Passwordless Login** — OTP-based authentication with minimal configuration
- **Route Protection** — Built-in authentication guards and routing utilities
- **Bearer Token Management** — Automatic JWT injection into HTTP requests via interceptor
- **Customizable Content** — Full i18n support with configurable labels, messages, and error text
- **Type-Safe** — Comprehensive TypeScript types and interfaces throughout

## Supported Providers

| Feature             | AWS Cognito | Supabase | Firebase |
|---------------------|:-----------:|:--------:|:--------:|
| Email + Password    |      ✅      |    ✅     |    🔜    |
| Username + Password |      ✅      |    ✅     |    🔜    |
| Passwordless (OTP)  |      ✅      |    ✅     |    🔜    |
| Social Providers    |      ✅      |    ✅     |    🔜    |
| Custom Attributes   |      ✅      |    ✅     |    🔜    |
| Password Reset      |      ✅      |    ✅     |    🔜    |
| Token Refresh       |      ✅      |    ✅     |    🔜    |

## List of Packages

| Package                           | Description                                      | NPM Link                                                                                                                                              | Downloads                                                                                                                                                  |
|-----------------------------------|--------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| @ngx-addons/omni-auth-core        | Core authentication library                      | [![NPM Version](https://img.shields.io/npm/v/%40ngx-addons%2Fomni-auth-core)](https://www.npmjs.com/package/@ngx-addons/omni-auth-core)               | [![NPM Downloads](https://img.shields.io/npm/d18m/%40ngx-addons%2Fomni-auth-core)](https://www.npmjs.com/package/@ngx-addons/omni-auth-core)               |
| @ngx-addons/omni-auth-ui-material | Material Design UI components for authentication | [![NPM Version](https://img.shields.io/npm/v/%40ngx-addons%2Fomni-auth-ui-material)](https://www.npmjs.com/package/@ngx-addons/omni-auth-ui-material) | [![NPM Downloads](https://img.shields.io/npm/d18m/%40ngx-addons%2Fomni-auth-ui-material)](https://www.npmjs.com/package/@ngx-addons/omni-auth-ui-material) |
| @ngx-addons/omni-auth-cognito     | AWS Cognito connector for authentication         | [![NPM Version](https://img.shields.io/npm/v/%40ngx-addons%2Fomni-auth-cognito)](https://www.npmjs.com/package/@ngx-addons/omni-auth-cognito)         | [![NPM Downloads](https://img.shields.io/npm/d18m/%40ngx-addons%2Fomni-auth-cognito)](https://www.npmjs.com/package/@ngx-addons/omni-auth-cognito)         |
| @ngx-addons/omni-auth-supabase    | Supabase connector for authentication            | [![NPM Version](https://img.shields.io/npm/v/%40ngx-addons%2Fomni-auth-supabase)](https://www.npmjs.com/package/@ngx-addons/omni-auth-supabase)       | [![NPM Downloads](https://img.shields.io/npm/d18m/%40ngx-addons%2Fomni-auth-supabase)](https://www.npmjs.com/package/@ngx-addons/omni-auth-supabase)       |

## Documentation

Full documentation with guides, API reference, and live demos is available at **[ngx-addons.github.io/omni-auth](https://ngx-addons.github.io/omni-auth/)**.

## License

MIT — See the [LICENSE](LICENSE.md) file for details.
