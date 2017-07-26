/*globals _drt, requirejs */
var W = window;
var C = W.console;

C.log('PHP', _drt);

if (typeof W.jQuery === 'function') {
  define('jquery', function () {
    return W.jQuery;
  });
}

requirejs.config({
  baseUrl: _drt.base,
  paths: {
    lib: 'libs',
  },
  shim: {},
});

requirejs(['lib/cookie'], function (cookie) {
  _drt.cookie = cookie;

  var paths = cookie.get('drt');
  if (paths) requirejs(paths.split(','));

  C.log(requirejs.toUrl(''));
});
