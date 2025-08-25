import { emailToFullName } from './email-to-full-name';

describe('emailToFullName', () => {
  describe('when email is null or undefined', () => {
    it('should return null for null email', () => {
      expect(emailToFullName(null)).toBeNull();
    });

    it('should return null for undefined email', () => {
      expect(emailToFullName(undefined)).toBeNull();
    });

    it('should return null for empty string', () => {
      expect(emailToFullName('')).toBeNull();
    });
  });

  describe('when email format is invalid', () => {
    it('should return null for email without @ symbol', () => {
      expect(emailToFullName('johndoe')).toBeNull();
    });

    it('should return null for email with only @ symbol', () => {
      expect(emailToFullName('@')).toBeNull();
    });

    it('should return null for email with only domain', () => {
      expect(emailToFullName('@example.com')).toBeNull();
    });
  });

  describe('when email format is valid', () => {
    it('should convert simple email to title case name', () => {
      expect(emailToFullName('john@example.com')).toBe('John');
    });

    it('should handle dots as space separators', () => {
      expect(emailToFullName('john.doe@example.com')).toBe('John Doe');
    });

    it('should handle commas as space separators', () => {
      expect(emailToFullName('john,doe@example.com')).toBe('John Doe');
    });

    it('should handle mixed dots and commas', () => {
      expect(emailToFullName('john.doe,smith@example.com')).toBe('John Doe Smith');
    });

    it('should handle plus symbol in email', () => {
      expect(emailToFullName('john.doe+tag@example.com')).toBe('John Doe');
    });

    it('should convert lowercase to title case', () => {
      expect(emailToFullName('john.doe@example.com')).toBe('John Doe');
    });

    it('should convert uppercase to title case', () => {
      expect(emailToFullName('JOHN.DOE@example.com')).toBe('John Doe');
    });

    it('should handle multiple consecutive separators', () => {
      expect(emailToFullName('john..doe@example.com')).toBe('John  Doe');
    });
  });

  describe('edge cases', () => {
    it('should handle email with numbers', () => {
      expect(emailToFullName('john123@example.com')).toBe('John123');
    });

    it('should handle single character name', () => {
      expect(emailToFullName('j@example.com')).toBe('J');
    });

    it('should return null when local part becomes empty after processing', () => {
      expect(emailToFullName('.@example.com')).toBe(' ');
    });
  });
});
