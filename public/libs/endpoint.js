/*globals _drt, define, */
define(['jquery'], function ($) {
  'use strict';

  var W = window;
  var C = W.console;
  var DF = {
    live: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/drt',
    test: _drt.base + 'data',
  };

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

  function makeMock(url) {
    var str = url;
    str = str.replace(DF.live, DF.test);
    str = str.replace('.php', '.json');
    C.log('makeMock', url);
    return str;
  }

  function parseData(data) {
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    return data;
  }

  function fixup(cb) {
    // in case response content-type is text/text
    return function (json) {
      cb(parseData(json));
    };
  }

  return function (endpoint, done, fail) {
    if (!endpoint) {
      throw ('no uri');
    }

    // TEST MOCKING
    if (_drt.dbug > 1) {
      endpoint = makeMock(endpoint);
    }

    done = done || makeCb('json');
    fail = fail || makeCb('fail', 'warn', 9);

    $.ajax(endpoint)
      .done(fixup(done)).fail(fail).always();
  };

});
