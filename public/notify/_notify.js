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

  function getData(key) {
    return {
      posts: [
        function () {
          confirm('do something with new post?');
        },
        'Better is Possible',
        'Andrea Voelke just created a new post.',
        '12 total posts on site',
      ],
      likes: [
        function () {
          confirm('do something with liked post?');
        },
        'Great job!',
        'Someone has liked a post that you created.',
        'You’ve been liked 123 times.',
      ],
    }[key];
  }

  function makeDiv(klass, line) {
    var el = $('<div>');
    var makeLine = function (i) {
      return $('<b>').addClass('l' + i).html(line[i] || '&nbsp;');
    };

    function _toggle() {
      if (el.is('.max')) {
        if (line[0]) line[0]();
        el.hide();
      }
      el.toggleClass('max');
    }

    function _minify(evt) {
      evt.stopPropagation();
      el.removeClass('max');
    }

    $('<p>').appendTo(el)
      .append(makeLine(1)).append(makeLine(2)).append(makeLine(3));
    $('<b class=xo>&times;</b>').appendTo(el)
      .click(_minify);
    el.addClass(klass).on('click', _toggle);

    return el;
  }

  var notiPost = makeDiv('notify post', getData('posts'));
  var notiLike = makeDiv('notify like', getData('likes'));

  $('body').prepend(notiPost, notiLike);
});
