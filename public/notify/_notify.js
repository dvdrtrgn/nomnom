define(['jqxtn', './fetch',
], function ($, Fetch) {

  var Nom = '_notify';
  var W = window;
  var C = W.console;
  var D = W._drt;

  function makeDiv(klass, line) {
    var el = $('<div>');
    var makeLine = function (i) {
      return $('<b>').addClass('slug' + i).html(line[i] || '&nbsp;');
    };

    function _close() {
      if (el.is('.max')) {
        if (line[0]) line[0]();
        else el.hide();
      }
      el.toggleClass('max');
    }

    function _toggle(evt) {
      evt.stopPropagation();
      el.toggleClass('max');
    }

    $('<p class=slugs>').appendTo(el)
      .append(makeLine(1)).append(makeLine(2)).append(makeLine(3));

    $('<b class=xo>&times;</b>').appendTo(el)
      .click(_close);

    el.addClass(klass).on('click', _toggle);

    return el;
  }

  function useData(data) {
    var notiPost = makeDiv('notify post', data.posts);
    var notiLike = makeDiv('notify like', data.likes);

    $('body').prepend(notiPost, notiLike);
  }

  function init() {
    $.loadCss(D.base + 'notify/notify.css');

    Fetch.get(useData);

    return {
      _: Nom,
      Fetch: Fetch,
    };
  }

  return init();
});

/*



 */
