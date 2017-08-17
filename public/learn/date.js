define(['jqxtn'], function ($) {
  'use strict';
  // help format date fields
  var NOM = 'date';
  var W = window;
  var C = W.console;
  // - - - - - - - - - - - - - - - - - -
  var DF = {
    input: '<input type="text" name="" value="12/12/2012">',
    select: '<select name=""><option>choose</option></select>',
    options: ['fancy', 'm/d/year', 'year-mm-dd'],
  };
  var EL = {
    body: '#content',
    input: '',
    select: '',
  };
  var API = {
    _: NOM,
    $: $,
  };

  function testing() {
    addDummyField();
    W.xxx = API.new();
  }

  function addDummyField() {
    EL.input = $(DF.input).appendTo(EL.body);
  }

  // - - - - - - - - - - - - - - - - - -

  function dupeSelect(api) {
    return EL.select.clone(true).data(NOM, api);
  }

  function generateSelect() {
    EL.select = $(DF.select).on('change', reread);

    DF.options.forEach(function (e, i) {
      var opt = $('<option>');

      opt.text(e).data(NOM, {
        idx: i + 1,
        src: e,
      });

      EL.select.append(opt);
    });
  }

  function reread() {
    var sel = $(this);
    var api = sel.data(NOM);
    var opt = sel.find(':selected').data(NOM) || {};

    api.idx = opt.idx || 0;
    api.src = opt.src || '';
    api.date = api.inp.readDate();

    C.log(api);
  }

  $.fn.readDate = function () {
    return new Date(this.val());
  };

  // - - - - - - - - - - - - - - - - - -
  // CONSTRUCT

  function make(a1) {
    var api = Object.create(API);

    api.inp = $(EL.input || a1);
    api.sel = dupeSelect(api).insertAfter(api.inp);

    C.log(api.inp);

    return api;
  }

  function init() {
    $.reify(EL);
    $.extend(API, {
      DF: DF,
      EL: EL,
      new: make,
    });

    generateSelect();
    testing();

    return API;
  }
  return init();
});

/*



*/
