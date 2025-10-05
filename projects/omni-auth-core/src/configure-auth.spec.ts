import {AUTH_CONFIG, AuthConfig, AuthConfigInput, configureAuth} from './configure-auth';
import { OmniAuthServiceMock } from './lib/auth.service.spec';
import { OmniAuthService } from './lib/auth.service';
import { inject, Injectable, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Injectable()
class TestService {
  authConfig = inject<AuthConfig>(AUTH_CONFIG);
}

describe('configureAuth', () => {
  let service: TestService;
  let config: AuthConfigInput;

  beforeEach(() => {
    config = {
      authService: OmniAuthServiceMock,
      identifierType: 'email',
      bearerAuthentication: {
        headerName: 'Lorem ipsum',
        headerValuePrefix: 'Prefix ',
        whitelistedEndpoints: ['/api/public'],
      },
    };

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        OmniAuthServiceMock,
        ...configureAuth(config),
        TestService,
      ],
    });

    service = TestBed.inject(TestService);
  });

  it('should return providers array with auth service and config', () => {
    const providers = configureAuth(config);

    expect(providers.length).toEqual(4);
    expect(providers[2]).toEqual({
      provide: OmniAuthService,
      useClass: OmniAuthServiceMock,
    });
    expect(providers[3]).toEqual({
      provide: AUTH_CONFIG,
      useValue: config,
    });
  });

  it('should provide access to auth service class', () => {
    expect(service.authConfig.authService).toBe(OmniAuthServiceMock);
  });

  it('should provide access to bearer authentication config', () => {
    expect(service.authConfig.bearerAuthentication).toBeDefined();
    expect(
      service.authConfig.bearerAuthentication?.whitelistedEndpoints,
    ).toEqual(['/api/public']);
    expect(service.authConfig.bearerAuthentication?.headerName).toBe(
      'Lorem ipsum',
    );
    expect(service.authConfig.bearerAuthentication?.headerValuePrefix).toBe(
      'Prefix ',
    );
  });
});
