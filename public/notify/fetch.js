/*globals _drt */
define(['jqxtn', 'lib/endpoint',
], function ($, Endpoint) {

  var NOM = 'fetch';
  var W = window;
  var C = W.console;

  // - - - - - - - - - - - - - - - - - -

  var Data = {};
  var Uris = {
    likes: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/drt/mycards.php',
    posts: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/drt/newcard.php',
  };

  function getData(cb) {
    setTimeout(function () {
      if (!Data.likes || !Data.posts) {
        getData(cb); // keep checking
      } else {
        cb(Data); // work done here
      }
    }, 99);
  }

  function request(cb) {
    delete Data.posts;
    delete Data.likes;

    Endpoint(Uris.posts, function (data) {
      Data.posts = data;
    });
    Endpoint(Uris.likes, function (data) {
      Data.likes = data;
    });

    getData(cb);
  }

  return {
    _: NOM,
    __: function () {},
    _Endpoint: Endpoint,
    Data: Data,
    Uris: Uris,
    //
    request: request,
  };
});

/*



 */
