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
  var Dupe;

  //
  // etc
  //

  function findCard() {
    var card = $('.gallery > .gallery-item, .possible-card-wrapper .possible-card');

    card = (card.length > 2) ? card.eq(2) : card.last();

    return card;
  }

  function dupeCard() {
    var card = findCard();
    var dupe = card.clone();

    if (!dupe.is('.toplist')) {
      dupe.addClass('toplist');
    } else {
      dupe = card; // already there! (for whatever reason)
    }
    return dupe;
  }

  function genUrl(obj) {
    var url = _drt.site;

    url += 'search-results/' + Hash.search(obj.filter);
    url += encodeURIComponent(Hash.research(obj.term));

    return url;
  }

  function makeLine(arr, filter) {
    var line = $('<li>');
    var obj = {
      filter: filter,
      term: arr[0],
      count: arr[1],
    };
    var link = [
      '<a href="', genUrl(obj), '">',
      Hash.search(obj.term),
      ' (', obj.count, ' posts)</a>',
    ];
    line.html(link.join(''));
    return line.data(Nom, obj);
  }

  function makeArticle(obj) {
    var div = $('<article>');
    var head = $('<b>').html(obj.title);
    var list = $('<ol>');
    obj.data.forEach(function (item) {
      list.append(makeLine(item, obj.filter));
    });
    return div.append(head, list);
  }

  function transArray(arr) {
    var init = arr.shift();
    var obj = {
      title: init[0],
      filter: init[1],
      data: arr,
    };
    return makeArticle(obj);
  }

  function data2elem(data) {

    data.cities = transArray(data.cities);
    data.categories = transArray(data.categories);

    return data;
  }

  function readCategories(obj) {
    var arr = [['TOP CATEGORIES', 'category']];

    for (var i in obj)
      if (i) arr.push([Hash.search(i), obj[i]]);

    Data.categories = arr;
  }

  function readCities(obj) {
    var arr = [['TOP CITIES', 'city']];

    for (var i in obj)
      if (i) arr.push([i, obj[i]]);

    Data.cities = arr;
  }

  function addDummies(wrap) {
    var blank = $('<div class="possible-card blank">');
    wrap.append(blank.clone(), blank.clone(), blank.clone());
  }

  function insertLists() {
    var dupe = Dupe.clone().empty();
    var card = findCard();
    var wrap = card.parent();

    dupe.insertAfter(card);
    dupe.append(Data.cities.clone(), Data.categories.clone());
    addDummies(wrap);
  }

  function readTop5(obj) {
    readCategories(obj.area_of_interest);
    readCities(obj.city);

    data2elem(Data);
    insertLists();
    $(document).on('sf:ajaxfinish', insertLists);
  }

  function init() {
    $.loadCss(_drt.base + 'toplist/toplist.css');

    Endpoint(Df.points.top5, readTop5);
    Dupe = dupeCard();

    return {
      _: Nom,
      _Endpoint: Endpoint,
      _Hash: Hash,
      Data: Data,
      Dupe: Dupe,
      Df: Df,
    };
  }

  return init();

});

/*



 */
