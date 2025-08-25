export { jwtInterceptor } from './lib/interceptors/jwt-interceptor';
export { emailToFullName } from './lib/email-to-full-name';

export { ErrorMessagePipe } from './lib/error/error-message.pipe';
export { RuntimeError } from './lib/error/runtime-error';
export { ActionErrorCollectorService } from './lib/error/action-error-collector.service';
export { FlowError } from './lib/error/flow-error';
export { OmniAuthError } from './lib/error/auth-error';

export * as patterns from './lib/config/patterns';

export type { AuthConfig } from './configure-auth';
export { AUTH_CONFIG } from './configure-auth';
export { configureAuth } from './configure-auth';

export type { AuthState } from './lib/auth.interface';
export { OmniAuthService } from './lib/auth.interface';
export { isError } from './lib/auth.interface';
export type {
  SocialSignInProviderKey,
  CustomSignInProviderKey,
  SignInProviderKey,
} from './lib/auth.interface';
export type { ContentConfig } from './lib/config/default-content.config';
export { defaultContent } from './lib/config/default-content.config';
export { onlyAuthenticated, onlyGuest } from './lib/auth-guard';
export { AuthRouteService } from './lib/routing/auth-route.service';
