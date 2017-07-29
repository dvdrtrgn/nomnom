/*globals _drt, requirejs */
(function () {
  'use strict';

  var W = window;
  var C = W.console;

  C.log('PHP', _drt);

  // http://kaidez.com/requirejs-wordpress/
  if (typeof W.jQuery === 'function') {
    define('jquery', function () {
      return W.$ = W.jQuery;
      // return W.jQuery;
    });
  }
  // http://requirejs.org/docs/errors.html

  requirejs.config({
    baseUrl: _drt.base,
    paths: {
      lib: 'libs',
      jscook: 'libs/js-cookie',
    },
    shim: {
      // jquery: {
      //   exports: '$',
      // },
    },
  });

  requirejs(['jquery', 'lib/cookie'], function ($, cookie) {
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
    if (paths) requirejs(paths.split(','), function () {
      C.log('args', arguments);
    });

    C.log(requirejs.toUrl(''));
  });

}());
