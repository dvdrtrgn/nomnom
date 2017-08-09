/*globals _drt */
define(['jqxtn', 'lib/endpoint', 'jscook',
], function ($, Endpoint, Cookie) {

  var Nom = 'fetch';
  var W = window;
  var C = W.console;
  var Data = {};
  var Uris = {
    likes: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/ecg/get.php',
    posts: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/ecg/latest.php',
  };

  function update() {
    delete Data.posts;
    delete Data.likes;

    Endpoint(Uris.posts, function (data) {
      Data.posts = data;
    });

    Endpoint(Uris.likes, function (data) {
      Data.likes = data;
    });
  }

  function setSearch(text) {
    var field = $('.sf-input-text');
    var form = field.closest('form');

    field.val('"' + text + '"');
    form.submit();
  }

  function cleanData() {
    var name = Data.posts.first_name + ' ' + Data.posts.last_name;
    var nameStr = name.length > 1 ? name : 'Someone';
    var postId = Number(Data.posts.id);
    var postCnt = Data.posts.total_posts;
    var postStr = postCnt + (postCnt === 1 ? ' post so far' : ' total posts');
    var likeCnt = Data.likes.reduce(function (tot, obj) {
      return tot + Number(obj.vortex_system_likes || 0);
    }, 0);

    var lastId = Number(Cookie.get('card_last_post_id')) || 0;
    var lastCnt = Number(Cookie.get('card_last_like_cnt')) || 0;

    var postArr = [
      function (arg, msg) {
        if (arg === 'setcookie') Cookie.set('card_last_post_id', postId);
        if (arg === 'setsearch') setSearch(msg);
      },
      'Better is Possible',
      nameStr + ' just created a new post.',
      postStr + ' on site',
      name,
    ];

    var likeArr = [
      function (arg) {
        if (arg === 'setcookie') Cookie.set('card_last_like_cnt', likeCnt);
      },
      'Great job!',
      'Someone has liked a post that you created.',
      'You’ve been liked ' + likeCnt + ' times.',
    ];

    return {
      posts: lastId < postId ? postArr : [],
      likes: lastCnt < likeCnt ? likeArr : [],
    };
  }

  function getData(cb) {
    setTimeout(function () {
      if (!Data.likes || !Data.posts) {
        getData(cb);
      } else {
        cb(cleanData());
      }
    }, 99);
  }

  function init() {
    update();
    return {
      _: Nom,
      _Cookie: Cookie,
      _Endpoint: Endpoint,
      Data: Data,
      Uris: Uris,
      //
      get: getData,
      update: update,
      setSearch: setSearch,
    };
  }

  return init();
});

/*



 */
