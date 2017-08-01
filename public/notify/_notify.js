/*globals _drt */
define(['jqxtn', './fetch',
], function ($, Fetch) {

  var Nom = '_notify';
  var W = window;
  var C = W.console;
  var El = {
    notiPost: 'notify post',
    notiLike: 'notify like',
  };

  function makeDiv(klass) {
    var el = $('<div>').addClass(klass);

    function _toggle(evt) {
      evt.stopPropagation();
      el.toggleClass('max');
    }

    el.on('click', _toggle);

    return el;
  }

  function fillDiv(el, data) {
    if (!data || !data.length) return;
    // i has data?
    el.empty();

    var makeLine = function (i) {
      return $('<b>').addClass('slug' + i).html(data[i] || '&nbsp;');
    };

    function _close() {
      if (el.is('.max')) {
        if (data[0]) data[0](); // cookie setting callback
        el.removeClass('max');
        el.hide();
      }
      el.toggleClass('max');
    }

    $('<p class=slugs>').appendTo(el)
      .append(makeLine(1)).append(makeLine(2)).append(makeLine(3));

    $('<b class=xo>&times;</b>').appendTo(el)
      .click(_close);

    return el.show();
  }

  function useData(data) {
    fillDiv(El.notiPost, data.posts);
    fillDiv(El.notiLike, data.likes);
  }

  function init() {
    $.loadCss(_drt.base + 'notify/notify.css');

    El.notiPost = makeDiv(El.notiPost).hide();
    El.notiLike = makeDiv(El.notiLike).hide();
    $('body').prepend(El.notiPost, El.notiLike);

    Fetch.get(useData);

    setInterval(function () {
      Fetch.update();
      Fetch.get(useData);
    }, 60 * 1000);

    return {
      _: Nom,
      _Fetch: Fetch,
      El: El,
    };
  }

  return init();
});

/*



 */
