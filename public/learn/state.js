define(['jqxtn'], function ($) {
  'use strict';
  // `normalize` history state
  var W = window;
  var C = W.console;

  var DF = {};
  var EL = {};

  function recover() {
    $(document).on('load', function () {
      var lost = history.state;
      C.warn(lost);
    });
    // When your page loads, it might have a non-null state object
    // if the page sets a state object then the user restarts their browser.
    // the page will receive an onload event, but no popstate event.
    // However, if you read the history.state property,
    // you'll get back the state object you would have gotten if a popstate had fired.
  }

  function init() {
    $.reify(EL);

    var api = {
      DF: DF,
      EL: EL,
      recover,
    };
    return api;
  }

  return init(function () {});
});

/*
    Moving backward and forward through history is done using the
    back(), forward(), and go() methods.

    history.pushState
    takes three parameters:
    - state object,
    - title (which is currently ignored)
    - URL (optional)

    history.replaceState()
    exactly like history.pushState()
    except that it modifies the current history entry instead of creating a new one
    Note: this doesn't prevent the creation of a new entry in the global browser history

    window.onpopstate
    event handler for the popstate event on the window

    When your page loads, it might have a non-null state object
    if the page sets a state object then the user restarts their browser.
    the page will receive an onload event, but no popstate event.
    However, if you read the history.state property,
    you'll get back the state object you would have gotten if a popstate had fired.


*/
