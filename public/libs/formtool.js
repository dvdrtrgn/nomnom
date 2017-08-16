define(['jquery'], function ($) {
  'use strict';

  var W = window;
  var C = W.console;

  var Df = {
    backnav: $('<a href="#">&lt; Return to all posts</a>'),
  };
  var El = {
    form: '.searchandfilter', // #search-filter-form-3453
    sort: '.searchandfilter .sf-field-sort_order select',
    filter: '.searchandfilter .sf-field-post-meta-area_of_interest select',
    search: '.searchandfilter .sf-field-search input',
  };

  function addNavBack() {
    Df.backnav.on('click', function (evt) {
      evt.preventDefault();
      setSearch();
      Df.backnav.hide();
    }).css({
      display: 'block',
      color: '#336699',
      marginBottom: '0.5em',
      textDecoration: 'underline',
    }).hide();

    El.form.after(Df.backnav);
  }

  function setSearch(text) {
    $.reify(El);
    El.filter.val(['']);
    El.search.val(text || '');
    El.form.submit();
    Df.backnav.show();
  }

  function setFilter(text) {
    $.reify(El);
    El.search.val('');
    El.filter.val([text]);
    El.form.submit();
    Df.backnav.show();
  }

  function init() {
    $.reify(El);
    addNavBack();

    return {
      Df: Df,
      El: El,
      filter: setFilter,
      search: setSearch,
    };
  }

  return init();
});
