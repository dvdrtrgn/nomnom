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
      jscook: 'libs/cookie',
      jqxtn: 'libs/xtn_jq',
    },
    shim: {
      // jquery: {
      //   exports: '$',
      // },
    },
  });

  requirejs(['jquery', 'jscook'], function ($, Cookie) {
    _drt.site = W.location.origin + W.location.pathname;
    _drt.Cookie = Cookie;

    _drt.defcon = function (num) {
      switch (num) {
      case 1:
        Cookie.set('drt', 'notify/_notify,toplist/_toplist');
        break;
      case 2:
        Cookie.set('drt', 'notify/_notify');
        break;
      case 3:
        Cookie.set('drt', 'toplist/_toplist');
        break;
      default:
        Cookie.set('drt', '');
      }
      W.location.reload();
    };

    function init() {
      var paths = Cookie.get('drt');
      if (paths) requirejs(paths.split(','), function () {
        C.log('args', arguments);
      });

      C.log(requirejs.toUrl(''));
    }

    $(init);
  });

}());
