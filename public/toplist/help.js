/*globals _drt */
define(['jqxtn', './hash',
], function ($, Hash) {

  var Nom = 'help';
  var W = window;
  var C = W.console;

  function _transArray(arr) {
    var init = arr.shift();

    return {
      title: init[0],
      filter: init[1],
      strings: arr,
    };
  }

  function addDummies(wrap) {
    var blank = $('<div class="possible-card blank">');
    wrap.append(blank.clone(), blank.clone(), blank.clone());
  }

  function dupeCard(card) {
    var dupe = card.clone();

    if (!dupe.is('.toplist')) {
      dupe.addClass('toplist');
    } else {
      dupe = card; // already there! (for whatever reason)
    }
    return dupe;
  }

  function findDupe() {
    var cards = $('.possible-card-wrapper .possible-card');
    var card = (cards.length > 1) ? cards.eq(1) : cards.last();
    // in avada css, set nth-child(<index+1>) to hidden
    return card;
  }

  function genUrl(obj) {
    var url = _drt.site;

    url += Hash.search(obj.filter); // 'search-results/' +
    url += encodeURIComponent(Hash.research(obj.term));

    return url;
  }

  function gsReady(bool) {
    if (bool === false) {
      $('.possible-card-wrapper').removeClass('ready');
    } else if (bool) {
      $('.possible-card-wrapper').addClass('ready');
    } else {
      return $('.possible-card-wrapper').is('.ready');
    }
  }

  function readCategs(obj) {
    var arr = [['TOP CATEGORIES', 'category']];

    for (var i in obj) {
      if (i) arr.push([Hash.search(i), obj[i]]); // turn keys into full text
    }
    return _transArray(arr);
  }

  function readCities(obj) {
    var arr = [['TOP CITIES', 'city']];

    for (var i in obj) {
      if (i) arr.push([i, obj[i]]);
    }
    return _transArray(arr);
  }

  return {
    _: Nom,
    //
    addDummies: addDummies,
    dupeCard: dupeCard,
    findDupe: findDupe,
    genUrl: genUrl,
    gsReady: gsReady,
    readCategs: readCategs,
    readCities: readCities,
    search: Hash.search,
  };
});

/*

  #search-filter-form-3453
  #search-filter-results-3453

 */
