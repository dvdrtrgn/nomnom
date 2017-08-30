/*globals _drt */
define(['jquery'], function ($) {
  'use strict';

  var W = window;
  var C = W.console;

  // set defaults
  $.ajaxSetup({
    cache: false,
  });

  function makeCb(label, meth, amt) {
    amt = amt || 1;
    meth = meth || 'log';
    label = label || 'makeCb';

    return function () {
      var args = $.fixArgs(arguments, amt);
      if (amt > 1) args = [label, args];
      else args.unshift(label);
      C[meth].apply(null, args);
    };
  }

  return function (endpoint, done, fail) {
    if (!endpoint) {
      throw ('no uri');
    }

    // TEST MOCKING
    if (_drt.site === 'http://localhost/wordpress/')
      switch (endpoint) {
      case 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/drt/newcard.php':
        endpoint = _drt.base + 'data/newcard.json';
        break;
      case 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/drt/mycards.php':
        endpoint = _drt.base + 'data/mycards.json';
        break;
      case 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/drt/topfives.php':
        endpoint = _drt.base + 'data/topfives.json';
        break;
      }

    done = done || makeCb('json');
    fail = fail || makeCb('fail', 'warn', 9);

    $.ajax(endpoint)
      .done(done).fail(fail).always();
  };

});
