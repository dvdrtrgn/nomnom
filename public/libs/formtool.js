/*global define, */
define(['jquery'], function ($) {
  'use strict';

  var W = window;
  var C = W.console;

  var DF = {
    backnav: $('<a href="#">&lt; Return to all posts</a>'),
  };
  var EL = {
    form: '.searchandfilter', // #search-filter-form-3453
    sort: '.searchandfilter .sf-field-sort_order select',
    filter: '.searchandfilter .sf-field-post-meta-area_of_interest select',
    search: '.searchandfilter .sf-field-search input',
  };

  function addNavBack() {
    DF.backnav.on('click', function (evt) {
      evt.preventDefault();
      setSearch();
    }).css({
      display: 'block',
      color: '#336699',
      marginBottom: '0.5em',
      textDecoration: 'underline',
    }).hide();

    EL.form.after(DF.backnav);
  }

  function setDirty(bool) {
    if (bool === false) {
      DF.backnav.hide();
    } else if (bool === true) {
      DF.backnav.show();
    } else {
      setDirty(Boolean(W.location.search));
    }
  }

  function setSearch(text) {
    $.reify(EL);
    EL.filter.val(['']);
    EL.search.val(text || '');
    EL.form.submit();
  }

  function setFilter(text) {
    $.reify(EL);
    EL.search.val('');
    EL.filter.val([text]);
    EL.form.submit();
  }

  function init() {
    $.reify(EL);
    addNavBack();
    $(document).on('sf:ajaxfinish', setDirty);
    // sf:[init, ajaxstart, ajaxfinish, ajaxerror]

    return {
      DF: DF,
      EL: EL,
      filter: setFilter,
      search: setSearch,
      dirty: setDirty,
    };
  }

  return init();
});
