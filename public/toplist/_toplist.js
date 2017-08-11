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
  var Data = {
    categs: null,
    cities: null,
    raw: null,
  };
  var El = {
    categs: null,
    cities: null,
    toplist: null,
  };

  //
  // etc
  //

  function findCard() {
    var cards = $(Df.posts);
    var pick = Df.index - 1;
    var card = (cards.length > pick) ? cards.eq(pick) : cards.last();

    return card;
  }

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

  function insertToplist() {
    var card = findCard();
    var next = card.next();
    var wrap = card.parent();

    El.toplist.insertAfter(card).css('visibility', 'visible');
    next.appendTo(wrap).css('visibility', 'visible');

    Help.addDummies(wrap);
    Help.gsReady(true);
  }

  function useData(data) {
    Data.raw = data;
    Data.categs = Help.readCategs(data.area_of_interest);
    Data.cities = Help.readCities(data.city);

    El.cities = makeArticle(Data.cities);
    El.categs = makeArticle(Data.categs);
    El.toplist.empty().append(El.cities, El.categs);

    $(document).on('sf:ajaxfinish', insertToplist);
    insertToplist();
  }

  function init() {
    if (~Df.homes.indexOf(_drt.site)) {
      Help.gsReady(false);

      $.loadCss(_drt.base + 'toplist/toplist.css');

      Endpoint(Df.points.top5, useData);

      El.toplist = Help.dupeCard(findCard());
    }

    return {
      _: Nom,
      _Endpoint: Endpoint,
      _Help: Help,
      Data: Data,
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
