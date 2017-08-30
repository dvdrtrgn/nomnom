/*globals _drt */
define(['jqxtn', 'jscook', 'lib/formtool',
], function ($, Cookie, Formtool) {

  var Nom = 'clean';
  var W = window;
  var C = W.console;
  var Data = {};

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

    var postObj = {
      dismiss: function (arg, msg) {
        if (arg === 'setcookie') Cookie.set('card_last_post_id', postId);
        if (arg === 'setsearch') Formtool.search('"' + msg + '"');
      },
      strings: [
        'Better is Possible',
        nameStr + ' just created a new post.',
        postStr + ' on site',
      ],
      title: Data.posts.post_title,
    };

    var likeObj = {
      dismiss: function (arg, msg) {
        if (arg === 'setcookie') Cookie.set('card_last_like_cnt', likeCnt);
        if (arg === 'setsearch') Formtool.search('"' + msg + '"');
      },
      strings: [
        'Great job!',
        'Someone has liked a post that you created.',
        'You’ve been liked ' + likeCnt + ' times.',
      ],
      title: (Data.likes[0] && Data.likes[0].post_title),
    };

    return {
      posts: lastId < postId ? postObj : '',
      likes: lastCnt < likeCnt ? likeObj : '',
    };
  }

  function loadData(obj) {
    Data = obj;
  }

  return {
    _: Nom,
    _Cookie: Cookie,
    _Formtool: Formtool,
    //
    load: loadData,
    strings: cleanData,
  };
});

/*



 */
