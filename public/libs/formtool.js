define(['jquery'], function ($) {
  'use strict';

  var W = window;
  var C = W.console;

  function setSearch(text) {
    var field = $('.sf-input-text');
    var form = field.closest('form');

    field.val('"' + text + '"');
    form.submit();
  }

  return {
    set: setSearch,
  };

});
