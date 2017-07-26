/*global define, */
define(['jquery'], function ($) {
  'use strict';

  var W = window;
  var C = W.console;
  var Q = $.pubsubs = $({});
  var RAF = W.requestAnimationFrame;

  $.wraf = function (fn) {
    RAF(function () {
      W.setTimeout(fn, 0);
    });
  };

  $.loadCss = function (url) {
    var link = $('<link>').attr({
      type: 'text/css',
      rel: 'stylesheet',
      href: url,
    });
    $('head').append(link);
  };

  // - - - - - - - - - - - - - - - - - -
  // PUBSUBS
  $.publish = function () {
    Q.trigger.apply(Q, arguments);
  };
  $.subscribe = function () {
    Q.on.apply(Q, arguments);
  };
  $.unsubscribe = function () {
    Q.off.apply(Q, arguments);
  };

  // - - - - - - - - - - - - - - - - - -
  // AUTOMATE
  $.reify = function (obj) { // replace vals(selectors) with elements
    return $.each(obj, function (i, sel) {
      if (typeof sel === 'object') {
        sel = sel.selector;
      }
      (obj[i] = $(sel)).selector = sel;
    });
  };

  $.logBadQuery = function (meth) {
    var orig = this.fn[meth];

    this.fn[meth] = function () {
      var args = [this.selector].concat([].slice.apply(arguments));
      var stack = Error().stack;
      var title = 'BAD [query, ' + meth + '-args...]:';
      stack = '\n\n' + (stack.split('\n')[2] || stack) + '\n\n';
      if (!this.length) C.log(title, args, stack);
      return orig.apply(this, arguments);
    };
  };

  return $;
});
