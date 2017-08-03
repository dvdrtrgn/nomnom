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

  requirejs(['jqxtn', 'jscook'], function ($, Cookie) {
    _drt.site = W.location.origin + W.location.pathname;
    _drt.cookies = {
      drt_mods: Cookie.get('drt_mods'),
      card_post_ids: Cookie.get('card_post_ids'),
      card_last_post_id: Cookie.get('card_last_post_id'),
      card_last_like_cnt: Cookie.get('card_last_like_cnt'),
    };

    _drt.defcon = function (num) {
      switch (num) {
      case 1:
        Cookie.set('drt_mods', 'notify/_notify,toplist/_toplist');
        break;
      case 2:
        Cookie.set('drt_mods', 'notify/_notify');
        break;
      case 3:
        Cookie.set('drt_mods', 'toplist/_toplist');
        break;
      default:
        Cookie.set('drt_mods', '');
      }
    };

    _drt.paths = _drt.cookies.drt_mods;

    if (_drt.paths === undefined) {
      _drt.paths = 'notify/_notify,toplist/_toplist';
    }
    _drt.paths = _drt.paths.split(',');

    function init() {
      if (_drt.paths.length) requirejs(_drt.paths, function () {
        _drt.modules = $.fixArgs(arguments);
      });
    }

    $(init);
  });

}());
