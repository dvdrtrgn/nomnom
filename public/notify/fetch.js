define(['jqxtn', 'lib/endpoint',
], function ($, Endpoint) {

  var Nom = 'fetch';
  var W = window;
  var C = W.console;
  var Data = {};
  var Uris = {
    likes: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/ecg/get.php',
    posts: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/ecg/latest.php',
  };

  Endpoint(Uris.posts, function (data) {
    Data.posts = data;
  });

  Endpoint(Uris.likes, function (data) {
    Data.likes = data;
  });

  function cleanData() {
    var name = Data.posts.first_name + ' ' + Data.posts.last_name;
    var tots = Data.posts.total_posts;
    var posts = tots + (tots === 1 ? ' post so far' : ' total posts');
    var likes = Data.likes.reduce(function (tot, obj) {
      return tot + Number(obj.vortex_system_likes || 0);
    }, 0);

    return {
      posts: [
        false,
        'Better is Possible',
        name + ' just created a new post.',
        posts + ' on site',
      ],
      likes: [
        false,
        'Great job!',
        'Someone has liked a post that you created.',
        'You’ve been liked ' + likes + ' times.',
      ],
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
    return {
      _: Nom,
      Endpoint: Endpoint,
      Data: Data,
      Uris: Uris,
      //
      get: getData,
    };
  }

  return init();
});

/*



 */
