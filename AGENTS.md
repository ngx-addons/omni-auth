# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**omni-auth** is an Angular monorepo providing modular, authentication-agnostic libraries. It includes:
- **omni-auth-core**: Abstract authentication service architecture with token management, guards, routing, and error handling
- **omni-auth-ui-material**: Pre-built Material Design UI components for common auth flows
- **omni-auth-cognito**: AWS Cognito connector implementing the abstract service
- **omni-auth-supabase**: Supabase connector implementing the abstract service
- **docs**: Documentation and demo application built with ng-doc

Uses **pnpm** as package manager and **Angular 20** with modern APIs (Signals, ResourceRef).

## Architecture

### Plugin Architecture
The core uses an **abstract service pattern** where:
- `OmniAuthService` is an abstract class defining the auth interface (sign in, sign up, sign out, providers, etc.)
- Concrete implementations (e.g., `AuthAwsCognitoService`) extend this for specific providers
- Configuration via `configureAuth()` injection function allows swapping implementations

### State Management
- **AuthState**: Core auth state shape with user info, token proxy, and error state
- Uses Angular **Signals** for `currentUser` (synchronous reactive state)
- Uses **ResourceRef** for `authState` (async reactive resource state)
- **Observable streams** for `accessToken$` and `idToken$` (token state as streams)

### Token Handling
- **TokenProxy**: Wrapper around JWT tokens with claims, expiry tracking
- **JwtToken**: Parses JWT structure (header, payload, signature)
- Supports generic claims via TypeScript generics for access/ID token claims
- **jwtInterceptor**: Automatically adds bearer tokens to HTTP requests (configurable endpoints)

### Error Handling
- **OmniAuthError**: Root error type for auth failures
- **FlowError**: Specific authentication flow error
- **ActionErrorCollectorService**: Collects and manages errors across auth actions
- **RuntimeError**: Low-level execution errors
- **ErrorMessagePipe**: Displays localized error messages in templates

### Routing & Guards
- **AuthRouteService**: Manages navigation redirects (post-login secured routes, post-logout guest routes)
- **onlyAuthenticated**: Route guard allowing only authenticated users
- **onlyGuest**: Route guard allowing only unauthenticated users

### UI Layer
Component structure in **omni-auth-ui-material**:
- **signin**: Username/email + password form
- **signup**: Registration with optional attributes
- **confirm-signin**: Verification code for passwordless/MFA
- **confirm-signup**: Email/phone confirmation
- **reset-password**: Password recovery flow
- **social-buttons**: Reusable social provider buttons
- **print-error**: Generic error display component
- **authenticated**: Displays when user is logged in
- **ui**: Base styling and shared utilities

## Development Commands

### Building
```bash
# Build individual libraries (production)
pnpm run build:omni-auth-core:prd
pnpm run build:omni-auth-cognito:prd
pnpm run build:omni-auth-ui-material:prd

# Build documentation site
pnpm run build:docs:prd

# Build everything
pnpm run build:prd
```

### Testing
```bash
# Run tests for omni-auth-core (headless, single run)
pnpm run tests:headless

# Run tests with code coverage
pnpm run tests:headless:coverage

# Run tests in watch mode (specific project)
ng test omni-auth-core

# Run tests for a specific library with watch mode
ng test omni-auth-ui-material
```

### Linting
```bash
# Lint all projects (TypeScript and HTML)
pnpm run lint

# Lint specific project (e.g., core library)
ng lint omni-auth-core
```

### Local Development
```bash
# Serve documentation/demo app in development mode
ng serve docs

# Watch and rebuild a library during development
ng build omni-auth-core --watch
```

### Publishing
```bash
# Publish all packages to npm
pnpm run publish

# CI publishing with provenance (used in CI/CD)
pnpm run publish:ci

# Publish individual packages
pnpm run publish:omni-auth-core
pnpm run publish:omni-auth-ui-material
pnpm run publish:omni-auth-cognito
```

## Project Structure

```
projects/
├── omni-auth-core/          # Core auth library (abstract service + utilities)
│   └── src/lib/
│       ├── auth.service.ts   # Abstract OmniAuthService class
│       ├── auth-guard.ts     # Route guards (onlyAuthenticated, onlyGuest)
│       ├── token/            # JWT token parsing and proxy
│       ├── error/            # Error handling and collection
│       ├── routing/          # AuthRouteService
│       ├── interceptors/     # jwtInterceptor for bearer tokens
│       ├── config/           # Configuration and patterns
│       └── types.ts          # Shared TypeScript types
│
├── omni-auth-ui-material/   # Material Design UI components
│   └── src/
│       ├── signin/           # Sign-in form component
│       ├── signup/           # Sign-up form component
│       ├── confirm-signin/   # Passwordless/MFA verification
│       ├── confirm-signup/   # Email confirmation
│       ├── reset-password/   # Password recovery
│       ├── social-buttons/   # Social auth providers UI
│       ├── print-error/      # Error display component
│       ├── authenticated/    # "You are logged in" component
│       └── ui/              # Base styles and utilities
│
├── omni-auth-cognito/       # AWS Cognito implementation
│   └── src/
│       └── auth-aws-cognito.service.ts  # Concrete OmniAuthService for Cognito
│
├── omni-auth-supabase/       # Supabase implementation
│   └── src/
│       └── auth-supabase.service.ts  # Concrete OmniAuthService for Supabase
│
└── docs/                    # Documentation & demo app
    └── src/
        ├── demos/           # Example implementations
        └── content/         # ng-doc documentation content
```

## Key Configuration Points

### Library Setup (configure-auth)
```typescript
configureAuth({
  authService: AuthAwsCognitoService,              // Concrete implementation
  identifierType: 'email' | 'username',            // Default: 'email'
  passwordlessEnabled: boolean,                     // Enable code-based auth
  bearerAuthentication?: {                         // Auto-add bearer tokens
    whitelistedEndpoints: (RegExp | string)[],
    headerName?: string,                            // Default: 'Authorization'
    headerValuePrefix?: string                      // Default: 'Bearer '
  },
  routing?: {
    secured: string[],   // Where to redirect after login
    guest: string[]      // Where to redirect after logout
  },
  validation?: {
    identifierPattern?: RegExp,
    passwordPattern?: RegExp
  }
})
```

### Library Exports
- Core public API via `projects/omni-auth-core/src/public-api.ts`
- Path aliases configured in `tsconfig.json`: `@ngx-addons/omni-auth-*`
- UI components via `projects/omni-auth-ui-material/src/public-api.ts`

## TypeScript Configuration

- Target: ES2022
- Strict mode enabled (all strict compiler options)
- Path aliases for monorepo imports: `@ngx-addons/omni-auth-*`
- No implicit overrides, no implicit returns, no fallthrough switches
- Isolated modules and experiment decorators enabled

## Testing Setup

- **Test Runner**: Karma with Jasmine
- **Coverage Tool**: karma-coverage with Chrome
- **Browser**: ChromeHeadless for CI
- **Mocking**: ng-mocks for Angular component testing
- Test files: `*.spec.ts` co-located with source
- Configuration: `karma.conf.js` in project roots

## Common Development Patterns

### Creating a New Auth Implementation
1. Extend `OmniAuthService<AccessTokenClaims, IdTokenClaims>`
2. Implement abstract methods (signIn, signUp, signOut, etc.)
3. Manage token state via `authState` (ResourceRef) and token observables
4. Return `FlowError` on authentication failures
5. Wrap in `configureAuth()` for injection

### Adding UI Components
1. Create feature folder (e.g., `two-factor-signin/`)
2. Build on Material components with shared error/loading patterns
3. Accept `@Input() identifier: string`
4. Emit `@Output() success: EventEmitter<void>`
5. Use `ActionErrorCollectorService` to collect errors for display
6. Export from `public-api.ts`

### Token Management
1. Use `TokenProxy` for token wrapping/checking expiry
2. Implement refreshing logic in service implementation
3. Expose via `idToken$` and `accessToken$` observables
4. jwtInterceptor automatically enriches requests if configured

## Important Notes

- All libraries are **zoneless** (designed without NgZone)
- Use **Signals** and **ResourceRef** (Angular's new reactive APIs) not RxJS BehaviorSubject for state
- **Error flow pattern**: Methods return `Promise<void | FlowError>` not throw
- **Generic type parameters**: AuthState and OmniAuthService support custom token claims
- Configuration is **provider-based**: Use `configureAuth()` for DI setup
- UI components are **decoupled** from service implementation (works with any OmniAuthService)
