import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { toKeypath } from '../src/index.js';

describe('midnight-smoker', () => {
  describe('util', () => {
    describe('formatKeypath', () => {
      describe('when path contains integer-like keys', () => {
        const path = ['some', 'object', '0', 'key'];

        it('should format the keypath using brackets', () => {
          let actual = toKeypath(path);
          assert.equal(actual, 'some.object[0].key');
          actual = toKeypath(['a', '0', '.c']);
          assert.equal(actual, 'a[0][".c"]');
        });

        describe('when the keys are numbers but invalid integers', () => {
          const path = ['some', 'object', '01', 'key'];

          // eslint-disable-next-line mocha/no-skipped-tests
          it('should format the keypath using brackets', () => {
            const actual = toKeypath(path);
            assert.equal(actual, 'some.object["01"].key');
          });
        });

        describe('when path contains an inter-like key wrapped in double-quotes', () => {
          const path = ['some', 'object', '"0"', 'key'];

          it('should format the keypath using brackets', () => {
            const actual = toKeypath(path);
            assert.equal(actual, 'some.object[0].key');
          });
        });

        describe('when path contains an inter-like key wrapped in single-quotes', () => {
          const path = ['some', 'object', "'0'", 'key'];

          it('should format the keypath using brackets', () => {
            const actual = toKeypath(path);
            assert.equal(actual, 'some.object[0].key');
          });
        });
      });

      describe('when path contains keys that cannot use dot notation', () => {
        const path = ['some', 'object', 'key-with-dash'];

        it('should format the keypath using brackets & double-quotes', () => {
          const actual = toKeypath(path);
          assert.equal(actual, 'some.object["key-with-dash"]');
        });

        describe('when path contains a key wrapped in double-quotes', () => {
          const path = ['some', 'object', '"key-with-dash"'];

          it('should format the keypath using brackets & double-quotes', () => {
            const actual = toKeypath(path);
            assert.equal(actual, 'some.object["key-with-dash"]');
          });
        });

        describe('when path contains a key wrapped in single-quotes', () => {
          const path = ['some', 'object', "'key-with-dash'"];

          it('should format the keypath using brackets & double-quotes', () => {
            const actual = toKeypath(path);
            assert.equal(actual, 'some.object["key-with-dash"]');
          });
        });
      });

      describe('when path contains keys that can use dot notation', () => {
        const path = ['some', 'object', 'key'];

        it('should format the keypath using dots', () => {
          const actual = toKeypath(path);
          assert.equal(actual, 'some.object.key');
        });

        describe('when path contains a key wrapped in double-quotes', () => {
          const path = ['some', 'object', '"key"'];

          it('should use dot notation', () => {
            const actual = toKeypath(path);
            assert.equal(actual, 'some.object.key');
          });
        });

        describe('when path contains a key wrapped in single-quotes', () => {
          const path = ['some', 'object', "'key'"];

          it('should use dot notation', () => {
            const actual = toKeypath(path);
            assert.equal(actual, 'some.object.key');
          });
        });
      });

      describe('when path is empty', () => {
        const path: string[] = [];

        it('should return an empty string', () => {
          const actual = toKeypath(path);
          assert.equal(actual, '');
        });
      });
    });
  });
});
