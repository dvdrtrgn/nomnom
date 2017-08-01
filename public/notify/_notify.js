define(['jqxtn', 'jscook', 'lib/endpoint',
], function ($, cookie, endpoint) {

  var Nom = '_notify';
  var W = window;
  var C = W.console;
  var X = W._drt;
  var Data = {};
  var Df = {
    points: {
      likes: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/ecg/get.php',
      posts: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/ecg/latest.php',
    },
  };

  X.site = W.location.href;

  (function getPosts(key) {
    var posts = cookie.get(key);

    if (posts === undefined) cookie.set(key, posts = '');
    posts = posts.split(',');

    C.debug(key, posts);
    return posts;
  }('card_post_ids'));

  function getData(key) {
    return {
      posts: [
        false,
        'Better is Possible',
        'Andrea Voelke just created a new post.',
        '12 total posts on site',
      ],
      likes: [
        false,
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

  function init() {
    $.loadCss(X.base + 'notify/notify.css');

    // var data = {
    //   posts:
    //   likes:
    // };
    endpoint(Df.points.posts, function (data) {
      Data.posts = data;
    });
    endpoint(Df.points.likes, function (data) {
      Data.likes = data;
    });

    var notiPost = getData('posts');
    var notiLike = getData('likes');

    notiPost = makeDiv('notify post', notiPost);
    notiLike = makeDiv('notify like', notiLike);

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
