import { getCurrentYear, getFooterCopy, getLatestNotification } from './utils'

describe('utils', () => {
  describe('getCurrentYear', () => {
    it('should return the current year', () => {
      const currentYear = new Date().getFullYear();
      expect(getCurrentYear()).toBe(currentYear);
    });
  });

  describe('getFooterCopy', () => {
    it('should return "Holberton School" when isIndex is true', () => {
      expect(getFooterCopy(true)).toBe('Holberton School');
    });

    it('should return "Holberton School main dashboard" when isIndex is false', () => {
      expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
    });
  });

  describe('getLatestNotification', () => {
    it('should return the correct notification string', () => {
      const expectedNotification = '<strong>Urgent requirement</strong> - complete by EOD';
      expect(getLatestNotification()).toBe(expectedNotification);
    });
  });
});
