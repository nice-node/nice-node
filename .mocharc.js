module.exports = {
  spec: 'test/**/*.ts',
  extension: ['ts'],
  require: ['should', 'ts-node/register'],
  exit: true
};

// # This is an example Mocha config containing every Mocha option plus others
// allow-uncaught: false
// async-only: false
// bail: false
// check-leaks: false
// color: true
// delay: false
// diff: true
// exit: false # could be expressed as "no-exit: true"
// extension:
//   - js
// # fgrep and grep are mutually exclusive
// # fgrep: something
// file:
//   - /path/to/some/file
//   - /path/to/some/other/file
// forbid-only: false
// forbid-pending: false
// full-trace: false
// global:
//   - jQuery
//   - $
// # fgrep and grep are mutually exclusive
// # grep: something
// growl: false
// ignore:
//   - /path/to/some/ignored/file
// inline-diffs: false
// # needs to be used with grep or fgrep
// # invert: false
// opts: false
// recursive: false
// reporter: spec
// reporter-option:
//   - foo=bar
//   - baz=quux
// require: '@babel/register'
// retries: 1
// slow: 75
// sort: false
// spec: test/**/*.spec.js # the positional arguments!
// timeout: false # same as "no-timeout: true" or "timeout: 0"
// trace-warnings: true # node flags ok
// ui: bdd
// v8-stack-trace-limit: 100 # V8 flags are prepended with "v8-"
// watch: false
// watch-files:
//   - 'lib/**/*.js'
//   - 'test/**/*.js'
// watch-ignore:
//   - 'lib/vendor'
