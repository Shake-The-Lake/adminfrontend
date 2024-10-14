import { describe, it, expect, vi, beforeEach } from 'vitest';
import { toast } from 'sonner';
import {
  cn,
  localeToLocalizedStringProperty,
  getTranslation,
  tryGetErrorMessage,
  onInvalidFormHandler,
  useEmitSuccessIfSucceeded,
  extractTypedInfoFromRouteParams,
} from '../../src/lib/utils';
import { renderHook } from '@testing-library/react';

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

vi.mock('react-i18next', () => ({
  getI18n: vi.fn(),
}));

vi.mock('../lib/utils', () => ({
  getTranslation: vi.fn(),
}));

describe('utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });
  });

  describe('localeToLocalizedStringProperty', () => {
    it('should return swissGerman for gsw locale', () => {
      expect(localeToLocalizedStringProperty('gsw')).toBe('swissGerman');
    });

    it('should return the locale as is for other locales', () => {
      expect(localeToLocalizedStringProperty('en')).toBe('en');
    });
  });

  describe('getTranslation', () => {
    it('should return the translation for the given locale', () => {
      const object = { en: 'Hello', swissGerman: 'Hallo' };
      expect(getTranslation('gsw', object)).toBe('Hallo');
    });

    it('should return the default translation if the locale translation is not available', () => {
      const object = { en: 'Hello' };
      expect(getTranslation('gsw', object)).toBe('Hello');
    });

    it('should return an empty string if the object is undefined', () => {
      expect(getTranslation('en')).toBe('');
    });
  });

  describe('tryGetErrorMessage', () => {
    it('should return a generic error message for unknown errors', () => {
      expect(tryGetErrorMessage(null)).toBe('An unknown error occurred');
    });

    it('should return a specific error message for axios errors with response', () => {
      const error = { response: { data: 'Not Found', status: 404 } };
      expect(tryGetErrorMessage(error)).toBe('Error: 404 - Not Found');
    });

    it('should return a specific error message for axios errors with request', () => {
      const error = { request: {} };
      expect(tryGetErrorMessage(error)).toBe('No response received from server');
    });

    it('should return the error message for generic JavaScript errors', () => {
      const error = new Error('Test error');
      expect(tryGetErrorMessage(error)).toBe('Test error');
    });
  });

  describe('onInvalidFormHandler', () => {
    it('should log the errors and show a toast message', () => {
      const errors = { field: { message: 'Required' } };
      console.log = vi.fn();
      onInvalidFormHandler(errors);
      expect(toast.error).toHaveBeenCalledWith('Could not be saved.', {
        description: 'There are validation errors in the form.',
      });
    });
  });

  describe('useEmitSuccessIfSucceeded', () => {
    it('should call onSuccessfullySubmitted if mutation is successful', () => {
      const onSuccessfullySubmitted = vi.fn();
      const mutation = { isSuccess: true, data: { id: 1 } } as UseMutationResult<any, Error, any>;

      renderHook(() => useEmitSuccessIfSucceeded(onSuccessfullySubmitted, mutation));

      expect(onSuccessfullySubmitted).toHaveBeenCalled();
    });

    it('should not call onSuccessfullySubmitted if mutation is not successful', () => {
      const onSuccessfullySubmitted = vi.fn();
      const mutation = { isSuccess: false, data: { id: 1 } } as UseMutationResult<any, Error, any>;

      renderHook(() => useEmitSuccessIfSucceeded(onSuccessfullySubmitted, mutation));

      expect(onSuccessfullySubmitted).not.toHaveBeenCalled();
    });
  });

  describe('extractTypedInfoFromRouteParams', () => {
    it('should extract typed info from route params', () => {
      const params = { id: '1', activityTypeId: '2', boatId: '3', timeSlotId: '4' };
      expect(extractTypedInfoFromRouteParams(params)).toEqual({
        eventId: 1,
        activityTypeId: 2,
        boatId: 3,
        timeSlotId: 4,
      });
    });

    it('should return 0 for missing params', () => {
      const params = {};
      expect(extractTypedInfoFromRouteParams(params)).toEqual({
        eventId: 0,
        activityTypeId: 0,
        boatId: 0,
        timeSlotId: 0,
      });
    });
  });
});