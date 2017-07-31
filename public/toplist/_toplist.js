define(['jqxtn', './hash', 'lib/endpoint',
], function ($, hash, endpoint) {
  'use strict';

  var Nom = '_toplist';
  var W = window;
  var C = W.console;
  var X = W._drt;
  var Data = {};
  var Df = {
    points: {
      categories: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/categories/top.php',
      cities: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/cities/top.php',
      top5: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/ecg/top5.php',
    },
  };

  X.hash = hash;
  X.site = W.location.origin + W.location.pathname;

  function dupeCard() {
    var sels = '.gallery > .gallery-item, .possible-card-wrapper .possible-card';
    var card = $(sels);
    if (card.length > 2) {
      card = card.eq(2);
    } else {
      card = card.last();
    }
    var dupe = card.clone();

    if (dupe.is('.toplist')) {
      dupe = card;
    } else {
      dupe.addClass('toplist').insertAfter(card);
    }
    return dupe.empty();
  }

  function trigFilter(evt) {
    evt.preventDefault();
    var ele = $(this);
    var dat = ele.data('Filter');
    var url = X.site;

    url += 'search-results/' + hash.search(dat.filter);
    url += encodeURIComponent(hash.research(dat.term));
    W.location = url;
  }

  function data2elem(data) {

    function makeItem(arr, filter) {
      var li = $('<li>');
      var dat = {
        filter: filter,
        term: arr[0],
        count: arr[1],
      };

      li.html('<a href="#">' + hash.search(dat.term) + ' (' + dat.count + ' posts)</a>');
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

    function prepData(arr) {
      var init = arr.shift();
      var obj = {
        title: init[0],
        filter: init[1],
        list: arr,
      };
      return makeArticle(obj);
    }

    data.cities = prepData(data.cities);
    data.categories = prepData(data.categories);

    return data;
  }

  function readCategories(obj) {
    var arr = [['TOP CATEGORIES', 'category']];

    for (var i in obj)
      if (i && i !== 'other') arr.push([hash.search(i), obj[i]]);

    Data.categories = arr;
  }

  function readCities(obj) {
    var arr = [['TOP CITIES', 'city']];

    for (var i in obj)
      if (i) arr.push([i, obj[i]]);

    Data.cities = arr;
  }

  function readTop5(obj) {
    readCategories(obj.area_of_interest);
    readCities(obj.city);

    var eles = data2elem(Data);
    dupeCard().append(eles.cities, eles.categories);
  }

  function init() {
    $.loadCss(X.base + 'toplist/toplist.css');

    endpoint(Df.points.top5, readTop5);

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
