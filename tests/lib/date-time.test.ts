import { validateDate, validateTime, getDisplayTimeFromBackend, toSwissLocaleTimeString, fromTimeToDateTime } from '../../src/lib/date-time.utils';

describe('date-time.utils', () => {
  describe('validateDate', () => {
    it('should return true for valid date strings', () => {
      expect(validateDate('2023-10-01')).toBe(true);
      expect(validateDate('2023-10-01T12:00:00Z')).toBe(true);
    });

    it('should return false for invalid date strings', () => {
      expect(validateDate('invalid-date')).toBe(false);
      expect(validateDate('')).toBe(false);
    });
  });

  describe('validateTime', () => {
    it('should return true for valid time strings', () => {
      expect(validateTime('12:00')).toBe(true);
      expect(validateTime('23:59')).toBe(true);
    });

    it('should return false for invalid time strings', () => {
      expect(validateTime('24:00')).toBe(false);
      expect(validateTime('12:60')).toBe(false);
      expect(validateTime('invalid-time')).toBe(false);
    });

    it('should return true for undefined value', () => {
      expect(validateTime(undefined)).toBe(true);
    });
  });

  describe('getDisplayTimeFromBackend', () => {
    it('should return the first 5 characters of the string', () => {
      expect(getDisplayTimeFromBackend('12:34:56')).toBe('12:34');
    });

    it('should return an empty string for undefined value', () => {
      expect(getDisplayTimeFromBackend(undefined)).toBe('');
    });
  });

  describe('toSwissLocaleTimeString', () => {
    it('should return the time in Swiss locale format', () => {
      const date = new Date('2023-10-01T12:34:56Z');
      expect(toSwissLocaleTimeString(date)).toBe('14:34');
    });
  });

  describe('fromTimeToDateTime', () => {
    it('should return a Date object with the specified time', () => {
      const date = new Date('2023-10-01T00:00:00Z');
      const time = '12:34:56';
      const result = fromTimeToDateTime(date, time);
      expect(result.getHours()).toBe(12);
      expect(result.getMinutes()).toBe(34);
      expect(result.getSeconds()).toBe(56);
    });
  });
});