/*globals _drt */
define(['jqxtn', 'jscook', 'lib/formtool',
], function ($, Cookie, Formtool) {

  var Nom = 'clean';
  var W = window;
  var C = W.console;
  var Data = {};

  function cleanData(obj) {
    Data = obj;

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
        if (arg === 'setsearch') Formtool.search(msg);
      },
      'Better is Possible',
      nameStr + ' just created a new post.',
      postStr + ' on site',
      Data.posts.post_title,
    ];

    var likeArr = [
      function (arg, msg) {
        if (arg === 'setcookie') Cookie.set('card_last_like_cnt', likeCnt);
        if (arg === 'setsearch') Formtool.search(msg);
      },
      'Great job!',
      'Someone has liked a post that you created.',
      'You’ve been liked ' + likeCnt + ' times.',
      Data.likes[0] && Data.likes[0].post_title,
    ];

    return {
      posts: lastId < postId ? postArr : [],
      likes: lastCnt < likeCnt ? likeArr : [],
    };
  }

  return {
    _: Nom,
    _Cookie: Cookie,
    _Formtool: Formtool,
    Data: Data,
    //
    data: cleanData,
  };
});

/*



 */