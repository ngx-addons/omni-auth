import { emailPattern, passwordPattern } from './patterns';

describe('passwordPattern', () => {
  describe('valid passwords', () => {
    it('should accept password with all required character types', () => {
      expect(passwordPattern.test('Password1!')).toBe(true);
      expect(passwordPattern.test('MyP@ssw0rd')).toBe(true);
      expect(passwordPattern.test('Secure123#')).toBe(true);
    });

    it('should accept passwords with various special characters', () => {
      expect(passwordPattern.test('Test123$')).toBe(true);
      expect(passwordPattern.test('Test123^')).toBe(true);
      expect(passwordPattern.test('Test123*')).toBe(true);
      expect(passwordPattern.test('Test123.')).toBe(true);
      expect(passwordPattern.test('Test123[')).toBe(true);
      expect(passwordPattern.test('Test123]')).toBe(true);
      expect(passwordPattern.test('Test123{')).toBe(true);
      expect(passwordPattern.test('Test123}')).toBe(true);
      expect(passwordPattern.test('Test123(')).toBe(true);
      expect(passwordPattern.test('Test123)')).toBe(true);
      expect(passwordPattern.test('Test123?')).toBe(true);
      expect(passwordPattern.test('Test123"')).toBe(true);
      expect(passwordPattern.test('Test123!')).toBe(true);
      expect(passwordPattern.test('Test123@')).toBe(true);
      expect(passwordPattern.test('Test123#')).toBe(true);
      expect(passwordPattern.test('Test123%')).toBe(true);
      expect(passwordPattern.test('Test123&')).toBe(true);
      expect(passwordPattern.test('Test123/')).toBe(true);
      expect(passwordPattern.test('Test123\\')).toBe(true);
      expect(passwordPattern.test('Test123,')).toBe(true);
      expect(passwordPattern.test('Test123>')).toBe(true);
      expect(passwordPattern.test('Test123<')).toBe(true);
      expect(passwordPattern.test('Test123\'')).toBe(true);
      expect(passwordPattern.test('Test123:')).toBe(true);
      expect(passwordPattern.test('Test123;')).toBe(true);
      expect(passwordPattern.test('Test123|')).toBe(true);
      expect(passwordPattern.test('Test123_')).toBe(true);
      expect(passwordPattern.test('Test123~')).toBe(true);
      expect(passwordPattern.test('Test123`')).toBe(true);
      expect(passwordPattern.test('Test123=')).toBe(true);
      expect(passwordPattern.test('Test123+')).toBe(true);
      expect(passwordPattern.test('Test123-')).toBe(true);
      expect(passwordPattern.test('Te st123')).toBe(true);
    });

    it('should accept passwords with minimum length of 8 characters', () => {
      expect(passwordPattern.test('Test123!')).toBe(true);
    });

    it('should accept passwords with maximum length of 256 characters', () => {
      const longPassword = 'A1!' + 'a'.repeat(253);
      expect(passwordPattern.test(longPassword)).toBe(true);
    });

    it('should accept passwords with spaces in the middle', () => {
      expect(passwordPattern.test('Test 123!')).toBe(true);
      expect(passwordPattern.test('My Pass123!')).toBe(true);
    });
  });

  describe('invalid passwords', () => {
    it('should reject passwords without uppercase letters', () => {
      expect(passwordPattern.test('password123!')).toBe(false);
      expect(passwordPattern.test('test123!')).toBe(false);
    });

    it('should reject passwords without lowercase letters', () => {
      expect(passwordPattern.test('PASSWORD123!')).toBe(false);
      expect(passwordPattern.test('TEST123!')).toBe(false);
    });

    it('should reject passwords without numbers', () => {
      expect(passwordPattern.test('Password!')).toBe(false);
      expect(passwordPattern.test('TestPass!')).toBe(false);
    });

    it('should reject passwords without special characters', () => {
      expect(passwordPattern.test('Password123')).toBe(false);
      expect(passwordPattern.test('TestPass123')).toBe(false);
    });

    it('should reject passwords shorter than 8 characters', () => {
      expect(passwordPattern.test('Test12!')).toBe(false);
      expect(passwordPattern.test('A1!')).toBe(false);
    });

    it('should reject passwords longer than 256 characters', () => {
      const longPassword = 'A1!' + 'a'.repeat(254);
      expect(passwordPattern.test(longPassword)).toBe(false);
    });

    it('should reject passwords starting with whitespace', () => {
      expect(passwordPattern.test(' Password123!')).toBe(false);
      expect(passwordPattern.test('  Test123!')).toBe(false);
    });

    it('should reject passwords ending with whitespace', () => {
      expect(passwordPattern.test('Password123! ')).toBe(false);
      expect(passwordPattern.test('Test123!  ')).toBe(false);
    });

    it('should reject empty strings', () => {
      expect(passwordPattern.test('')).toBe(false);
    });

    it('should reject passwords with only whitespace', () => {
      expect(passwordPattern.test('        ')).toBe(false);
      expect(passwordPattern.test('   ')).toBe(false);
    });
    it('should reject passwords with whitespace at the end / start', () => {
      expect(passwordPattern.test('Test123 ')).toBe(false);
      expect(passwordPattern.test(' Test123')).toBe(false);
    });
  });
});

describe('emailPattern', () => {
  describe('valid emails', () => {
    it('should accept standard email formats', () => {
      expect(emailPattern.test('user@example.com')).toBe(true);
      expect(emailPattern.test('test@domain.org')).toBe(true);
      expect(emailPattern.test('admin@company.net')).toBe(true);
    });

    it('should accept emails with dots in local part', () => {
      expect(emailPattern.test('first.last@example.com')).toBe(true);
      expect(emailPattern.test('user.name@domain.org')).toBe(true);
    });

    it('should accept emails with plus signs in local part', () => {
      expect(emailPattern.test('user+tag@example.com')).toBe(true);
      expect(emailPattern.test('test+123@domain.org')).toBe(true);
    });

    it('should accept emails with numbers in local part', () => {
      expect(emailPattern.test('user123@example.com')).toBe(true);
      expect(emailPattern.test('123user@domain.org')).toBe(true);
    });

    it('should accept emails with hyphens in domain', () => {
      expect(emailPattern.test('user@sub-domain.com')).toBe(true);
      expect(emailPattern.test('test@my-site.org')).toBe(true);
    });

    it('should accept emails with subdomains', () => {
      expect(emailPattern.test('user@mail.example.com')).toBe(true);
      expect(emailPattern.test('test@sub.domain.org')).toBe(true);
    });

    it('should accept emails with IP addresses in brackets', () => {
      expect(emailPattern.test('user@[192.168.1.1]')).toBe(true);
      expect(emailPattern.test('test@[10.0.0.1]')).toBe(true);
    });

    it('should accept emails with quoted local parts', () => {
      expect(emailPattern.test('"username"@example.com')).toBe(true);
      expect(emailPattern.test('"test"@domain.org')).toBe(true);
      expect(emailPattern.test("o'namer@domain.org")).toBe(true);
    });

    it('should accept emails with various TLD lengths', () => {
      expect(emailPattern.test('user@example.co')).toBe(true);
      expect(emailPattern.test('test@domain.info')).toBe(true);
      expect(emailPattern.test('admin@site.museum')).toBe(true);
    });
  });

  describe('invalid emails', () => {
    it('should reject emails without @ symbol', () => {
      expect(emailPattern.test('userexample.com')).toBe(false);
      expect(emailPattern.test('testdomain.org')).toBe(false);
    });

    it('should reject emails without domain', () => {
      expect(emailPattern.test('user@')).toBe(false);
      expect(emailPattern.test('test@')).toBe(false);
    });

    it('should reject emails without local part', () => {
      expect(emailPattern.test('@example.com')).toBe(false);
      expect(emailPattern.test('@domain.org')).toBe(false);
    });

    it('should reject emails with multiple @ symbols', () => {
      expect(emailPattern.test('user@@example.com')).toBe(false);
      expect(emailPattern.test('test@domain@com')).toBe(false);
    });

    it('should reject emails with spaces in unquoted local part', () => {
      expect(emailPattern.test('user name@example.com')).toBe(false);
      expect(emailPattern.test('test user@domain.org')).toBe(false);
    });

    it('should reject emails with invalid characters in domain', () => {
      expect(emailPattern.test('user@exam_ple.com')).toBe(false);
      expect(emailPattern.test('test@domain$.org')).toBe(false);
    });

    it('should reject emails without TLD', () => {
      expect(emailPattern.test('user@example')).toBe(false);
      expect(emailPattern.test('test@domain')).toBe(false);
    });

    it('should reject emails with single character TLD', () => {
      expect(emailPattern.test('user@example.c')).toBe(false);
      expect(emailPattern.test('test@domain.o')).toBe(false);
    });

    it('should reject empty strings', () => {
      expect(emailPattern.test('')).toBe(false);
    });

    it('should reject emails starting with dot in local part', () => {
      expect(emailPattern.test('.user@example.com')).toBe(false);
    });

    it('should reject emails ending with dot in local part', () => {
      expect(emailPattern.test('user.@example.com')).toBe(false);
    });

    it('should reject emails with consecutive dots in local part', () => {
      expect(emailPattern.test('user..name@example.com')).toBe(false);
    });
  });
});
