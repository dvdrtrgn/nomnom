define(['jquery'], function ($) {
  'use strict';

  var W = window;
  var C = W.console;

  var El = {
    form: '.searchandfilter',
    sort: '.searchandfilter .sf-field-sort_order select',
    filter: '.searchandfilter .sf-field-post-meta-area_of_interest select',
    search: '.searchandfilter .sf-field-search input',
  };

  function setSearch(text) {
    $.reify(El);
    El.search.val('"' + text + '"');
    El.form.submit();
  }

  function setFilter(text) {
    $.reify(El);
    El.filter.val('"' + text + '"');
    El.form.submit();
  }

  function init() {
    $.reify(El);

    return {
      filter: setFilter,
      search: setSearch,
    };
  }

  return init();
});
