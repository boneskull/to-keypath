export default {
  autoDetect: ['node:test'],

  env: {
    runner: 'node',
    type: 'node',
  },
  files: ['src/**/*.ts'],
  tests: ['test/**/*.spec.ts'],
};
