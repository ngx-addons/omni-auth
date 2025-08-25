import { AUTH_CONFIG, AuthConfig, configureAuth } from './configure-auth';
import { OmniAuthServiceMock } from './lib/auth.interface.spec';
import { OmniAuthService } from '@ngx-addons/omni-auth-core';
import { inject, Injectable, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Injectable()
class TestService {
  authConfig = inject<AuthConfig>(AUTH_CONFIG);
}

describe('configureAuth', () => {
  let service: TestService;
  let config: AuthConfig;

  beforeEach(() => {
    config = {
      authService: OmniAuthServiceMock,
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

    expect(providers.length).toEqual(2);
    expect(providers[0]).toEqual({
      provide: OmniAuthService,
      useClass: OmniAuthServiceMock,
    });
    expect(providers[1]).toEqual({
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
