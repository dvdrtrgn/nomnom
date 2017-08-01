/*globals _drt */
define(['jqxtn', './hash', 'lib/endpoint',
], function ($, Hash, Endpoint) {
  'use strict';

  var Nom = '_toplist';
  var W = window;
  var C = W.console;
  var Df = {
    points: {
      categories: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/categories/top.php',
      cities: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/cities/top.php',
      top5: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/ecg/top5.php',
    },
  };
  var Data = {};

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
    var url = _drt.site;

    url += 'search-results/' + Hash.search(dat.filter);
    url += encodeURIComponent(Hash.research(dat.term));
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

      li.html('<a href="#">' + Hash.search(dat.term) + ' (' + dat.count + ' posts)</a>');
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
      if (i && i !== 'other') arr.push([Hash.search(i), obj[i]]);

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
    $.loadCss(_drt.base + 'toplist/toplist.css');

    Endpoint(Df.points.top5, readTop5);

    return {
      _: Nom,
      Endpoint: Endpoint,
      Hash: Hash,
      Data: Data,
      Df: Df,
    };
  }

  return init();

});

/*



 */
