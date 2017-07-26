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

  function getData() {
    function foo() {
      alert('TBD');
    }
    return {
      post: [
        foo,
        'Better is Possible',
        'Andrea Voelke just created a new post.',
        '12 total posts on site',
      ],
      like: [
        foo,
        'Great job!',
        'Someone has liked a post that you created.',
        'You’ve been liked 123 times.',
      ],
    };
  }

  function makeDiv(klass, line) {
    var el = $('<div>');
    var blah = 'Blah blah blah';

    function fn() {
      $(this).toggleClass('max').click(function () {
        $(this).hide();
      });
    }

    function makeLine(i) {
      return $('<b>') //
        .addClass('l' + i) //
        .text(line[i] || blah);
    }

    $('<p>').appendTo(el)
      .append(makeLine(1)).append(makeLine(2)).append(makeLine(3))
      .append($('<b class=xo>&times;</b>').click(line[0] || fn));
    el.addClass(klass).one('click', fn);

    return el;
  }

  var data = getData();
  var notiPost = makeDiv('notify post', data.post);
  var notiLike = makeDiv('notify like', data.like);

  $('body').prepend(notiPost, notiLike);
});
