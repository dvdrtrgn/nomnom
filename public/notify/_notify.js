define(['lib/xtn_jq', 'lib/cookie'], function ($, cookie) {
  var W = window;
  var C = W.console;
  var X = W._drt;

  X.cookie = cookie;
  X.site = W.location.href;

  (function getPosts(key) {
    var posts = cookie.get(key);

    if (posts === undefined) cookie.set(key, posts = '');
    posts = posts.split(',');

    C.debug(key, posts);
    return posts;
  }('card_post_ids'));

  if (~X.site.indexOf('?')) {
    return;
  }

  $.loadCss(`${X.base}notify/notify.css`);

  function makeDiv(klass) {
    function fn() {
      $(this).toggleClass('max');
    }

    var el = $('<div>');
    $('<p>').appendTo(el)
      .append('<b class=l1>Blah blah blah</b>')
      .append('<b class=l2>Blah blah blah</b>')
      .append('<b class=l3>Blah blah blah</b>');

    el.addClass(klass).click(fn);

    return el;
  }
  var notiPost = makeDiv('notify post');
  var notiLike = makeDiv('notify like');

  $('body').prepend(notiPost, notiLike);
});
