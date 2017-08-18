require.config({
  // baseUrl: 'scripts',
  paths: {
    jquery: 'https://goo.gl/1NXWa8?',
    lodash: 'https://goo.gl/uxQpja?',
  },
  shim: {},
});
require(['util', 'factory'], function (U, Factory) {
  var W = window;
  var C = console;

  W.drt = {
    test: Factory.new(),
  };

  // expose for testing
  U.expando(W.drt, Factory);
  C.log('drt_main', W.drt);
});
