/*globals _drt */
define(['jqxtn', 'lib/endpoint', 'lib/formtool',
], function ($, Endpoint) {

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

  function getData(cb) {
    setTimeout(function () {
      if (!Data.likes || !Data.posts) {
        getData(cb);
      } else {
        cb(Data);
      }
    }, 99);
  }

  function init() {
    update();
    return {
      _: Nom,
      _Endpoint: Endpoint,
      Data: Data,
      Uris: Uris,
      //
      get: getData,
      update: update,
    };
  }

  return init();
});

/*



 */
