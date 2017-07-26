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

require(['lib/cookie'], function (cookie) {
  _drt.cookie = cookie;
  if (cookie.get('drt')) require([
    'notify/_notify',
    'toplist/_toplist',
  ]);

  C.log(require.toUrl(''));
});
