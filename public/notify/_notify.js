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

});
