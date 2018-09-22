import { createStorage } from '../Storage';

describe('Given the Storage utility', () => {
  describe('when using the storage', () => {
    it('should provide methods for setting, getting and dumping data', async () => {
      const storage = createStorage({ foo: 'bar' });

      storage.set('a', 'b');

      expect(storage.get('a')).toBe('b');
      expect(storage.dump()).toStrictEqual({
        foo: 'bar',
        a: 'b'
      });
    });
  });
});