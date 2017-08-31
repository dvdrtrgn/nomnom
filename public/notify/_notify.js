/*globals _drt */
define(['jqxtn', './clean', './fetch',
], function ($, Clean, Fetch) {

  var NOM = '_notify';
  var W = window;
  var C = W.console;

  // - - - - - - - - - - - - - - - - - -

  var Df = {
    homes: [
      'http://ecgsolutions.hosting.wellsfargo.com/marketing/csc/',
      'http://localhost/wordpress/',
    ],
    refreshTime: 3e4,
    retireTime: 1e4,
    toggleEvents: 'click keypress',
    triggerEvents: 'mousemove keydown',
  };
  var El = {
    notiPost: 'notify post',
    notiLike: 'notify like',
  };
  var Saved = {
    posts: '',
    likes: '',
  };

  // - - - - - - - - - - - - - - - - - -
  // HELPERS

  function runOnce(fn) {
    var ran = false;
    return function () {
      if (ran) return;
      ran = true;
      return fn();
    };
  }

  function nextMove(fn) { // run if user is moving on page
    $('body').one(Df.triggerEvents, runOnce(fn));
  }

  function sleepSoon(ele) {
    nextMove(function () {
      setTimeout(function () {
        if (!ele.is(':hover')) ele.addClass('retire');
        sleepSoon(ele); // mouse was over tab
      }, Df.retireTime); // go away after 10sec
    });
  }

  function wakeUp(ele) {
    nextMove(function () {
      ele.removeClass('retire');
      sleepSoon(ele);
    });
  }

  function toggleMax(ele) {
    var data = ele.data(NOM);
    data.max = !data.max;
    ele.toggleClass('max');
  }

  function captureEvent(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    return $(evt.currentTarget);
  }

  // - - - - - - - - - - - - - - - - - -
  // HANDLES

  function _close(evt) {
    var ele = captureEvent(evt).closest('.notify');
    var data = ele.data(NOM);

    if (data.max) {
      data.cb('setcookie');
      ele.addClass('retire');
    }
    toggleMax(ele);
  }

  function _toggle(evt) {
    var ele = captureEvent(evt);
    var data = ele.data(NOM);

    if (data.max) {
      data.cb('setsearch', data.title);
    }
    wakeUp(ele);
    toggleMax(ele);
  }

  // - - - - - - - - - - - - - - - - - -
  // CONSTRUCT

  function makeNotice(klass) {
    var ele = $('<div tabindex=0>').addClass(klass);

    ele.on(Df.toggleEvents, _toggle);

    return ele;
  }

  function updateNotice(ele, data) {
    if (!data) return; // icanhasdata?
    var strs = data.strings;

    data.cb = data.dismiss || $.noop; // look in data for a callback clue
    data.max = false;

    ele.empty().data(NOM, data);
    ele.addClass('retire');
    wakeUp(ele);

    var makeLine = function (i) {
      return $('<b>').addClass('slug' + i).html(strs[i - 1] || '&nbsp;');
    };

    $('<p class=slugs>').appendTo(ele)
      .append(makeLine(1)).append(makeLine(2)).append(makeLine(3));

    $('<b class=xo tabindex=0>&times;</b>').appendTo(ele)
      .on(Df.toggleEvents, _close);

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
      nextMove(fetchNow); // fetch when user is engaged
    }, Df.refreshTime);
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
      _: NOM,
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
