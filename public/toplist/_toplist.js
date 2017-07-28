define(['lib/xtn_jq', './hash', 'lib/endpoint',
], function ($, hash, endpoint) {

  var Nom = '_toplist';
  var W = window;
  var C = W.console;
  var X = W._drt;
  var Data = {};
  var Df = {
    points: {
      categories: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/categories/top.php',
      cities: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/cities/top.php',
    },
  };

  X.hash = hash;
  X.site = W.location.href;

  function dupeCard() {
    var sels = '.gallery > .gallery-item, .possible-card-wrapper .possible-card';
    var card = $(sels).eq(2);
    var dupe = card.clone();

    if (dupe.is('.toplist')) {
      dupe = card;
    } else {
      dupe.addClass('toplist').insertBefore(card);
    }
    return dupe.empty();
  }

  function initData(data) {
    function trigFilter(evt) {
      evt.preventDefault();
      var ele = $(this);
      var dat = ele.data('Filter');
      var url = X.site;

      url += 'search-results/' + hash.search(dat.filter);
      url += encodeURIComponent(dat.term);
      W.location = url;
    }

    function makeItem(arr, filter) {
      var li = $('<li>');
      var dat = {
        filter: filter,
        term: arr[0],
        count: arr[1],
      };

      li.html(`<a href="#">${hash.search(dat.term)} (${dat.count} posts)</a>`);
      li.on('click', trigFilter).data('Filter', dat);
      return li;
    }

    function makeArticle(obj) {
      var h1 = $('<b>').html(obj.title);
      var ol = $('<ol>');
      var div = $('<article>').append(h1, ol);

      obj.list.forEach(function (item) {
        ol.append(makeItem(item, obj.filter));
      });

      return div;
    }

    function prepData(data) {
      // var data = JSON.parse(str);
      C.log(data);
      var init = data.shift();
      var arg = {
        title: init[0],
        filter: init[1],
        list: data,
      };
      window.console.log(arg);
      return makeArticle(arg);
    }

    data.cities = prepData(data.cities);
    data.categories = prepData(data.categories);
    return data;
  }

  function listCats(obj) {
    var arr = [
      ['TOP CATEGORIES', 'category'],
    ];
    for (var i in obj) {
      arr.push([i, obj[i]]);
    }
    Data.categories = arr;
  }

  function listCits(obj) {
    var arr = [
      ['TOP CITIES', 'city'],
    ];
    for (var i in obj) {
      arr.push([i, obj[i]]);
    }
    Data.cities = arr;
  }

  function checkData() {
    if (Data.categories && Data.cites) {
      W.clearInterval(Df.ival);

      var data = initData(data);
      dupeCard().append(data.cities, data.categories);
    }
  }

  function init() {
    $.loadCss(`${X.base}toplist/toplist.css`);

    endpoint(Df.points.categories, listCats);
    endpoint(Df.points.cities, listCits);

    Df.ival = W.setInterval(checkData, 999);

    return {
      _: Nom,
      endpoint: endpoint,
      Data: Data,
      Df: Df,
    };
  }

  if (X.site.indexOf('?') === -1) {
    return init();
  }

});

/*



 */
