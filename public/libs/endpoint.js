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

    switch (endpoint) {
    case 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/ecg/get.php':
      endpoint = _drt.base + 'data/get.json';
      break;
    case 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/ecg/latest.php':
      endpoint = _drt.base + 'data/latest.json';
      break;
    case 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/ecg/top5.php':
      endpoint = _drt.base + 'data/top5.json';
      break;
    }

    done = done || makeCb('json');
    fail = fail || makeCb('fail', 'warn', 9);

    $.ajax(endpoint)
      .done(done).fail(fail).always();
  };

});
