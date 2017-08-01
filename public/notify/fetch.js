define(['jqxtn', 'lib/endpoint',
], function ($, endpoint) {

  var Nom = 'fetch';
  var W = window;
  var C = W.console;
  var Data = {};
  var Uris = {
    likes: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/ecg/get.php',
    posts: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/ecg/latest.php',
  };

  endpoint(Uris.posts, function (data) {
    Data.posts = data;
  });

  endpoint(Uris.likes, function (data) {
    Data.likes = data;
  });

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
    return {
      _: Nom,
      endpoint: endpoint,
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
