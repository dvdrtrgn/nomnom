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
  _drt.defcon = function (num) {
    switch (num) {
    case 1:
      cookie.set('drt', 'notify/_notify,toplist/_toplist');
      break;
    case 2:
      cookie.set('drt', 'notify/_notify');
      break;
    case 3:
      cookie.set('drt', 'toplist/_toplist');
      break;
    default:
      cookie.set('drt', '');
    }
    W.location.reload();
  };

  var paths = cookie.get('drt');
  if (paths) requirejs(paths.split(','));

  C.log(requirejs.toUrl(''));
});
