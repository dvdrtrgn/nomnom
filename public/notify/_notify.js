/*globals _drt */
define(['jqxtn', './clean', './fetch',
], function ($, Clean, Fetch) {

  var Nom = '_notify';
  var W = window;
  var C = W.console;

  // - - - - - - - - - - - - - - - - - -

  var Df = {
    homes: [
      'http://ecgsolutions.hosting.wellsfargo.com/marketing/csc/',
      'http://localhost/wordpress/',
    ],
  };
  var El = {
    notiPost: 'notify post',
    notiLike: 'notify like',
  };
  var Saved = {
    posts: '',
    likes: '',
  };

  function nextMove(fn) {
    $('body').one('mousemove', fn);
  }

  function sleepSoon(ele) {
    nextMove(function () {
      setTimeout(function () {
        if (!ele.is(':hover')) ele.addClass('retire');
        sleepSoon(ele); // mouse was over tab
      }, 10e3); // go away after 10sec
    });
  }

  function wakeUp(ele) {
    nextMove(function () {
      ele.removeClass('retire');
      sleepSoon(ele);
    });
  }

  function toggleMax(ele) {
    var data = ele.data(Nom);
    data.max = !data.max;
    ele.toggleClass('max');
  }

  // - - - - - - - - - - - - - - - - - -
  // HANDLES



  // - - - - - - - - - - - - - - - - - -
  // CONSTRUCT

  function makeNotice(klass) {
    var ele = $('<div tabindex=0>').addClass(klass);

    function _toggle(evt) {
      wakeUp(ele);
      evt.preventDefault();
      evt.stopPropagation();
      var data = ele.data(Nom);

      if (data.max) {
        data.cb('setsearch', data.title);
      }
      toggleMax(ele);
    }

    ele.on('click keypress', _toggle);

    return ele;
  }

  function updateNotice(ele, data) {
    if (!data) return; // icanhasdata?
    var strs = data.strings;

    data.cb = data.dismiss || $.noop; // look in data for a callback clue
    data.max = false;
    ele.empty().data(Nom, data);
    ele.addClass('retire');
    wakeUp(ele);

    var makeLine = function (i) {
      return $('<b>').addClass('slug' + i).html(strs[i - 1] || '&nbsp;');
    };

    function _close(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      if (data.max) {
        data.cb('setcookie');
        ele.addClass('retire');
      }
      toggleMax(ele);
    }

    $('<p class=slugs>').appendTo(ele)
      .append(makeLine(1)).append(makeLine(2)).append(makeLine(3));

    $('<b class=xo tabindex=0>&times;</b>').appendTo(ele)
      .on('click keypress', _close);

    return ele.show();
  }

  function filterChanges(objs) {
    var posts = JSON.stringify(objs.posts);
    var likes = JSON.stringify(objs.likes);

    if (Saved.posts !== posts) {
      Saved.posts = posts;
    } else {
      objs.posts = '';
    }

    if (Saved.likes !== likes) {
      Saved.likes = likes;
    } else {
      objs.likes = '';
    }
  }

  function useData(data) {
    Clean.load(data);
    var objs = Clean.strings();

    filterChanges(objs);

    objs.posts && updateNotice(El.notiPost, objs.posts);
    objs.likes && updateNotice(El.notiLike, objs.likes);
  }

  // - - - - - - - - - - - - - - - - - -
  // INITS

  function fetchNow() {
    Fetch.request(useData);
    setTimeout(function () {
      nextMove(fetchNow);
    }, 30 * 1000);
  }

  function init() {
    if (~Df.homes.indexOf(_drt.site)) {
      $.loadCss(_drt.base + 'notify/notify.css');

      El.notiPost = makeNotice(El.notiPost).hide();
      El.notiLike = makeNotice(El.notiLike).hide();
      $('body').prepend(El.notiPost, El.notiLike);

      fetchNow();
    }

    return {
      _: Nom,
      _Clean: Clean,
      _Fetch: Fetch,
      El: El,
      Saved: Saved,
    };
  }

  return init();
});

/*



 */
