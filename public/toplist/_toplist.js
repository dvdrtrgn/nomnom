/*globals _drt */
define(['jqxtn', './help', 'lib/endpoint',
], function ($, Help, Endpoint) {
  'use strict';

  var Nom = '_toplist';
  var W = window;
  var C = W.console;
  var Df = {
    index: 2, // in avada css, set nth-child(<index+1>) to hidden
    wrap: '.possible-card-wrapper',
    posts: '.possible-card-wrapper .possible-card',
    homes: [
      'http://ecgsolutions.hosting.wellsfargo.com/marketing/csc/',
    ],
    points: {
      top5: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/ecg/top5.php',
    },
  };
  var Data = {};
  var Dupe;
  var El = {};

  //
  // etc
  //

  function ghostCards() {
    $(Df.wrap).removeClass('ready');
  }

  function revealCards() {
    $(Df.wrap).addClass('ready');
  }

  function findCard() {
    var cards = $(Df.posts);
    var pick = Df.index - 1;
    var card = (cards.length > pick) ? cards.eq(pick) : cards.last();

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

  // moved

  function makeLine(arr, filter) {
    var line = $('<li>');
    var obj = {
      filter: filter,
      term: arr[0],
      count: arr[1],
    };
    var link = [
      '<a href="', Help.genUrl(obj), '">',
      Help.search(obj.term),
      ' (', obj.count, ' posts)</a>',
    ];

    line.html(link.join(''));
    line.data(Nom, obj);

    return line;
  }

  function makeArticle(obj) {
    var div = $('<article>');
    var head = $('<b>').html(obj.title);
    var list = $('<ol>');

    obj.strings.forEach(function (item) {
      list.append(makeLine(item, obj.filter));
    });

    return div.append(head, list);
  }

  function transArray(arr) {
    var init = arr.shift();
    var obj = {
      title: init[0],
      filter: init[1],
      strings: arr,
    };
    return makeArticle(obj);
  }

  function data2elem() {
    El.cities = transArray(Data.cities.slice());
    El.categories = transArray(Data.categories.slice());
  }

  // moved

  function insertToplist() {
    var dupe = Dupe.clone().empty();
    var card = findCard();
    var next = card.next();
    var wrap = card.parent();

    dupe.insertAfter(card).css('visibility', 'visible');
    next.appendTo(wrap).css('visibility', 'visible');
    dupe.append(El.cities.clone(), El.categories.clone());
    Help.addDummies(wrap);
    revealCards();
  }

  function useData(data) {
    Data.categories = Help.readCategories(data.area_of_interest);
    Data.cities = Help.readCities(data.city);

    data2elem();
    insertToplist();
    $(document).on('sf:ajaxfinish', insertToplist);
  }

  function init() {
    if (~Df.homes.indexOf(_drt.site)) {
      ghostCards();

      $.loadCss(_drt.base + 'toplist/toplist.css');

      Endpoint(Df.points.top5, useData);

      Dupe = dupeCard();
    }

    return {
      _: Nom,
      _Endpoint: Endpoint,
      _Help: Help,
      Data: Data,
      Dupe: Dupe,
      Df: Df,
      El: El,
    };
  }

  return init();

});

/*

  #search-filter-form-3453
  #search-filter-results-3453

 */
