import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ErrorMessagePipe } from './error-message.pipe';
import { ActionErrorCollectorService } from '../error/action-error-collector.service';
import { FlowError } from '../error/flow-error';
import { defaultContentEmail } from '../config/default-content.config';

describe('ErrorMessagePipe', () => {
  let pipe: ErrorMessagePipe;
  let collectorService: ActionErrorCollectorService;
  const mockMessages = {
    ...defaultContentEmail.errors,
    invalidCode: 'Mock Invalid Code Message',
    unknown: 'Mock Unknown Code Message',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        ActionErrorCollectorService,
        ErrorMessagePipe,
      ],
    });

    collectorService = TestBed.inject(ActionErrorCollectorService);
    collectorService.reset();

    pipe = TestBed.inject(ErrorMessagePipe);
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null when no current error exists', () => {
    const result = pipe.transform('signIn', mockMessages);

    expect(result()).toBeNull();
  });

  it('should return null when error source does not match', () => {
    const mockError: FlowError = {
      source: 'signIn',
      code: 'invalidCode',
      silent: false,
      error: new Error('Some error'),
      getErrorMessage: function (): string {
        return 'Error message';
      },
    };

    collectorService.handle(mockError);

    const result = pipe.transform('signIn', mockMessages);

    expect(result()).not.toBeNull();
  });

  it('should return null when error is silent', () => {
    const mockError: FlowError = {
      source: 'signIn',
      code: 'invalidCode',
      silent: true,
      error: new Error('Some error'),
      getErrorMessage: function (): string {
        return 'Error message';
      },
    };

    collectorService.handle(mockError);

    const result = pipe.transform('signIn', mockMessages);

    expect(result()).toBeNull();
  });

  it('should return null when error does not exist', () => {
    collectorService.reset();

    const result = pipe.transform('signIn', mockMessages);

    expect(result()).toBeNull();
  });

  it('should return specific error message when error code exists in messages', () => {
    const mockError: FlowError = {
      source: 'signIn',
      code: 'invalidCode',
      silent: false,
      error: new Error('Some error'),
      getErrorMessage: function (): string {
        return 'Error message';
      },
    };

    collectorService.handle(mockError);
    const result = pipe.transform('signIn', mockMessages);

    expect(result()).toBe('Mock Invalid Code Message');
  });

  it('should return unknown error message when error code does not exist in messages', () => {
    const mockError: FlowError = {
      source: 'signIn',
      code: 'invalidCode2' as FlowError['code'],
      silent: false,
      error: new Error('Some error'),
      getErrorMessage: function (): string {
        return 'Error message';
      },
    };

    collectorService.handle(mockError);
    const result = pipe.transform('signIn', mockMessages);

    expect(result()).toBe('Mock Unknown Code Message');
  });

  it('should react to changes in current error signal', () => {
    const mockError: FlowError = {
      source: 'signIn',
      code: 'invalidCode',
      silent: false,
      error: new Error('Some error'),
      getErrorMessage: function (): string {
        return 'Error message';
      },
    };
    const result = pipe.transform('signIn', mockMessages);

    collectorService.reset();
    expect(result()).toBeNull();
    collectorService.handle(mockError);
    expect(result()).not.toBeNull();
    collectorService.reset();
    expect(result()).toBeNull();
  });
});
