/*globals _drt */
define(['jqxtn', './clean', './fetch',
], function ($, Clean, Fetch) {

  var Nom = '_notify';
  var W = window;
  var C = W.console;
  var El = {
    notiPost: 'notify post',
    notiLike: 'notify like',
  };

  function makeDiv(klass) {
    var ele = $('<div tabindex=0>').addClass(klass);

    function _toggle(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      var data = ele.data(Nom);

      ele.toggleClass('max');
      if (data.max) {
        data.cb('setsearch', data.title);
      }
      data.max = !data.max;
    }

    ele.on('click keypress', _toggle);

    return ele;
  }

  function fillDiv(ele, obj) {
    var strs = obj.strings;
    if (!obj || !strs || !strs.length) return;
    // icanhasdata?

    obj.cb = obj.dismiss || $.noop; // look in data for a callback clue
    obj.max = false;
    ele.empty().data(Nom, obj);

    var makeLine = function (i) {
      return $('<b>').addClass('slug' + i).html(strs[i - 1] || '&nbsp;');
    };

    function _close(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      if (obj.max) {
        obj.cb('setcookie');
        ele.removeClass('max');
        ele.hide();
      }
      ele.toggleClass('max');
    }

    $('<p class=slugs>').appendTo(ele)
      .append(makeLine(1)).append(makeLine(2)).append(makeLine(3));

    $('<b class=xo tabindex=0>&times;</b>').appendTo(ele)
      .on('click keypress', _close);

    return ele.show();
  }

  function useData(data) {
    Clean.load(data);
    var objs = Clean.strings();

    fillDiv(El.notiPost, objs.posts);
    fillDiv(El.notiLike, objs.likes);
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
      _Clean: Clean,
      _Fetch: Fetch,
      El: El,
    };
  }

  return init();
});

/*



 */
