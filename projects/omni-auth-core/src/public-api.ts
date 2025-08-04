export {ErrorMessagePipe} from './lib/error/error-message.pipe';

export {RuntimeError} from './lib/error/runtime-error';

export {ActionErrorCollectorService} from './lib/error/action-error-collector.service';

export {FlowError} from './lib/error/flow-error';

export * as patterns from './lib/config/patterns';

export type {AuthConfig} from './configure-auth';
export {AUTH_CONFIG} from './configure-auth';

export {OmniAuthError} from './lib/error/auth-error';
export type {OmniAuthService, AuthState} from './lib/auth.interface';

export {isError} from './lib/auth.interface';
export type {SocialProvider} from './lib/auth.interface';

export type {ContentConfig} from './lib/config/default-content.config';
export {defaultContent} from './lib/config/default-content.config';

export {onlyAuthenticated, onlyGuest} from './lib/auth-guard';

export {AuthRouteService} from './lib/routing/auth-route.service';

export {AUTH_SERVICE, configureAuth} from './configure-auth';
