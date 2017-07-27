/*global define, */
define(['jquery'], function ($) {
  'use strict';

  var W = window;
  var C = W.console;
  var X = W._drt;

  function fixArgs(args, count) {
    return [].slice.call(args).slice(0, count);
  }

  function makeCb(label, meth, amt) {
    amt = amt || 1;
    meth = meth || 'log';
    label = label || 'makeCb';

    return function () {
      var args = fixArgs(arguments, amt);
      if (amt > 1) args = [label, args];
      else args.unshift(label);
      C[meth].apply(null, args);
    };
  }

  return function (nom, done, fail) {
    nom = nom || 'latests';
    done = done || makeCb('json');
    fail = fail || makeCb('fail', 'info', 9);

    $.ajax(X.base + 'data/' + nom + '.json')
      .done(done).fail(fail).always();
  };

});
