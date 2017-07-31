(function (factory) {
  'use strict';
  var V = '0.1.0';
  var W = (W && W.window || window);

  if (!(typeof define === 'function' && define.amd)) {
    console.warn('shim:autoreveal.js', V);
    W.autoreveal = factory(jQuery);
  } else {
    console.info('AMD:autoreveal.js', V);
    define(['jquery'], factory);
  }
}(function ($) {
  'use strict';

  var W = (W && W.window || window);
  var C = (W.C || W.console || {});

  // - - - - - - - - - - - - - - - - - -

  return function (Reveal) {
    var qty, qel, util;

    if (!Reveal) {
      Reveal = W._rev; // if not passed in look to global Reveal instance
      C.warn('autoreveal', 'no Reveal passed, trying global space');
    }

    util = {
      parseSearch: function () { // turn search string into object
        var obj = {};
        var qry = W.location.search.slice(1).split('&');

        qry.forEach(function (seg) {
          seg = seg.split('=');
          if (seg[0]) { // must have key (optional val)
            obj[seg[0]] = seg[1];
          }
        });
        return obj;
      },
      getNextMultiple: function (base, step) { // first higher multiple
        var high = base;
        if (step) {
          high = Math.ceil(base / step) * step;
        }
        return high;
      },
      revealPast: function (Rev, num) { // assume Reveal instance
        var tot = Rev.total();
        var step = Rev.inc();
        var shown = Rev.showing();

        if (num > shown) {
          var top = util.getNextMultiple(num, step);

          num = (num ? top : tot) - shown; // without a count, show all
          Rev.next(num);
        }
      },
      expandSoon: function (ele) { // wait for reveals a moment
        setTimeout(function () {
          $(ele).find('.ex-target').click();
        }, 500);
      },
    };

    qel = $('#' + util.parseSearch().id); // query for target element
    qty = Number(qel.data('ExpanderIndex')) + 1; // turn index into quantity

    if (qty) {
      util.revealPast(Reveal, qty);
      util.expandSoon(qel);
    }
  };
}));


(function ($) {
  var W = (W && W.window || window);
  W._lo = W.Loader(3e3, /* 3 sec buffer */ [function () {
    // var els = $('div.external-blog').children();
    var host = 'https://blogs.wf.com/collegeplanning';
    // var filters = '?filter[posts_per_page]=4';
    // W._groc = W.Grocer(host).fillerUp(filters, els);
    var els = $('div.external-blog article');
    var i = 1;
    var filters = '?per_page=1&page=';
    $.each(els, function () {
      W.Grocer(host).fillerUp(filters + i, $(this));
      i++;
    });
 }, function () {
    W._mod = W.Modal.init('#main div.modal', {
      force: true
    });
    W._dia = W.Dialog.bind('.external-link');
 }, function () {
    W._exp = W.Expander(
      '#grid-preview .ex-init',
      '#grid-content .widget:not(:first-child)', {
        align: 'top'
      }
    );
 }, function () {
    W._rev = W.Revealer(
      '.load_more-button', '#grid-preview .widget', 7
    );
    // W._lo.start();
    setTimeout(function () {
      W.autoreveal(W._rev);
      // W._lo.stop();
    }, 2222);
 }, function () {
    $('.so-panel[data-index="0"] video.sow-background-element').get(0).play();
 }]);
})(jQuery);
