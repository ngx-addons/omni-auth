import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { provideZonelessChangeDetection, Signal, signal } from '@angular/core';
import { onlyAuthenticated, onlyGuest } from './auth-guard';
import { AuthState, OmniAuthService } from './auth.service';
import {AUTH_CONFIG, AuthConfigInput} from '../configure-auth';
import { OmniAuthServiceMock } from './auth.service.spec';
import { MockService } from 'ng-mocks';
import { Observable } from 'rxjs';
import { GuardResult, MaybeAsync } from '@angular/router';

const expectSubscribe = (resolver: MaybeAsync<GuardResult>) => {
  if (typeof resolver !== 'object' || !('subscribe' in resolver)) {
    throw new Error('Guard did not return an observable');
  }

  return (resolver as Observable<GuardResult>)
};
describe('Auth Guards', () => {
  let mockAuthService: jasmine.SpyObj<{
    authState: {
      isLoading: Signal<boolean>;
      value: jasmine.Spy<() => AuthState>;
    };
  }>;
  let mockRoute: ActivatedRouteSnapshot;
  let mockRouterStateSnapshot: RouterStateSnapshot;
  let mockAuthConfig: AuthConfigInput;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('OmniAuthService', [], {
      authState: {
        isLoading: signal(false),
        value: jasmine.createSpy('value'),
      },
    });

    mockAuthConfig = {
      authService: OmniAuthServiceMock,
      routing: {
        guest: ['/login'],
        secured: ['/dashboard'],
      },
    };

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: OmniAuthService, useValue: authServiceSpy },
        { provide: AUTH_CONFIG, useValue: mockAuthConfig },
      ],
    });

    mockAuthService = TestBed.inject(
      OmniAuthService,
    ) as unknown as jasmine.SpyObj<{
      authState: {
        isLoading: Signal<boolean>;
        value: jasmine.Spy<() => AuthState>;
      };
    }>;

    mockRoute = MockService(ActivatedRouteSnapshot, {
      children: [],
      url: [],
      root: MockService(ActivatedRouteSnapshot, {
        children: [],
        url: [],
      }),
    });


    mockRouterStateSnapshot = MockService(RouterStateSnapshot);
  });

  describe('onlyAuthenticated', () => {
    it('should allow access when user is authenticated', (done) => {
      mockAuthService.authState.value.and.returnValue({
        state: 'authenticated',
      });

      const guard = onlyAuthenticated();
      TestBed.runInInjectionContext(() => {
        const resolver = guard(mockRoute, mockRouterStateSnapshot);

        expectSubscribe(resolver).subscribe((value) => {
          expect(value).toBe(true);
          done();
        });
      });
    });

    it('should redirect to default guest route when user is not authenticated', (done) => {
      mockAuthService.authState.value.and.returnValue({
        state: 'unauthenticated',
      });

      const guard = onlyAuthenticated();
      TestBed.runInInjectionContext(() => {
        const resolver = guard(mockRoute, mockRouterStateSnapshot);

        expectSubscribe(resolver).subscribe((value) => {
          expect(String(value)).toEqual('/login');
          done();
        });
      });
    });

    it('should redirect to custom route when provided and user is not authenticated', (done) => {
      mockAuthService.authState.value.and.returnValue({
        state: 'unauthenticated',
      });

      const guard = onlyAuthenticated({ redirectTo: ['/custom-login'] });
      TestBed.runInInjectionContext(() => {
        const resolver = guard(mockRoute, mockRouterStateSnapshot);

        expectSubscribe(resolver).subscribe((value) => {
          expect(String(value)).toEqual('/custom-login');
          done();
        });
      });
    });

    it('should wait for loading to complete before checking authentication', (done) => {
      const loadingSignal = signal(true);
      mockAuthService.authState.isLoading = loadingSignal;
      mockAuthService.authState.value.and.returnValue({
        state: 'authenticated',
      });

      const guard = onlyAuthenticated();
      TestBed.runInInjectionContext(() => {
        const resolver = guard(mockRoute, mockRouterStateSnapshot);

        expectSubscribe(resolver).subscribe((value) => {
          expect(value).toBe(true);
          done();
        });

        // Simulate loading completion
        setTimeout(() => {
          loadingSignal.set(false);
        }, 10);
      });
    });

    it('should use fallback route when no config routing is provided', (done) => {
      mockAuthConfig.routing = undefined;

      mockAuthService.authState.value.and.returnValue({
        state: 'unauthenticated',
      });

      const guard = onlyAuthenticated();
      TestBed.runInInjectionContext(() => {
        const resolver = guard(mockRoute, mockRouterStateSnapshot);

        expectSubscribe(resolver).subscribe((value) => {
          expect(String(value)).toEqual('/');
          done();
        });
      });
    });

    describe('edge cases', () => {
      it('should handle unknown authentication states in onlyAuthenticated', (done) => {
        mockAuthService.authState.value.and.returnValue({ state: 'unknown' });

        const guard = onlyAuthenticated();
        TestBed.runInInjectionContext(() => {
          const resolver = guard(mockRoute, mockRouterStateSnapshot);

          expectSubscribe(resolver).subscribe((value) => {
            expect(String(value)).toEqual('/login');
            done();
          });
        });
      });

      it('should handle unknown authentication states in onlyGuest', (done) => {
        mockAuthService.authState.value.and.returnValue({ state: 'unknown' });

        const guard = onlyGuest();
        TestBed.runInInjectionContext(() => {
          const resolver = guard(mockRoute, mockRouterStateSnapshot);

          expectSubscribe(resolver).subscribe((value) => {
            expect(value).toBe(true);
            done();
          });
        });
      });
    });
  });
});
