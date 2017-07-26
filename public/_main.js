/*globals _drt */
var W = window;
var C = W.console;

C.log('PHP', _drt);

if (typeof W.jQuery === 'function') {
  define('jquery', function () {
    return W.jQuery;
  });
}

require.config({
  baseUrl: _drt.base,
  paths: {
    lib: 'libs',
  },
  shim: {},
});

require([

  'notify/_notify',
  'toplist/_toplist',

], function () {
  // C.log(require.toUrl(''));
});
