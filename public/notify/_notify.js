define(['lib/xtn_jq', 'lib/cookie', 'lib/endpoint',
], function ($, cookie, endpoint) {

  var Nom = '_notify';
  var W = window;
  var C = W.console;
  var X = W._drt;
  var Data = {};
  var Df = {
    points: {
      likes: 'likes',
      posts: 'posts',
    },
  };

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
      return $('<b>').addClass('slug' + i).html(line[i] || '&nbsp;');
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

    $('<p class=slugs>').appendTo(el)
      .append(makeLine(1)).append(makeLine(2)).append(makeLine(3));
    $('<b class=xo>&times;</b>').appendTo(el)
      .click(_minify);
    el.addClass(klass).on('click', _toggle);

    return el;
  }

  function init() {
    $.loadCss(`${X.base}notify/notify.css`);

    // var data = {
    //   posts: endpoint(Df.points.posts),
    //   likes: endpoint(Df.points.likes),
    // };

    var notiPost = makeDiv('notify post', getData('posts'));
    var notiLike = makeDiv('notify like', getData('likes'));

    $('body').prepend(notiPost, notiLike);

    return {
      _: Nom,
      endpoint: endpoint,
      Data: Data,
      Df: Df,
    };
  }

  return init();
});

/*



 */
