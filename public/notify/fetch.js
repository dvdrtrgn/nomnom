/*globals _drt, define, */
define(['jqxtn', 'lib/endpoint',
], function ($, Endpoint) {

  var NOM = 'fetch';
  var W = window;
  var C = W.console;

  // - - - - - - - - - - - - - - - - - -

  var Data = {};

  function getData(cb) {
    setTimeout(function () {
      if (!Data.likes || !Data.posts) {
        getData(cb); // keep checking
      } else {
        cb(Data); // work done here
      }
    }, 99);
  }

  function init(obj, cb) {
    delete Data.posts;
    delete Data.likes;

    Endpoint(obj.posts, function (data) {
      Data.posts = data;
    });
    Endpoint(obj.likes, function (data) {
      Data.likes = data;
    });

    getData(cb);
  }

  return {
    _: NOM,
    '.': function () {},
    //
    init: init,
  };
});

/*



 */
