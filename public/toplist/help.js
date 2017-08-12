/*globals _drt */
define(['jqxtn', './hash',
], function ($, Hash) {

  var Nom = 'help';
  var W = window;
  var C = W.console;

  function _transArray(obj, arr) {
    for (var key in obj) {
      arr.push({
        key: key,
        val: obj[key],
        label: Hash.search(key),
      });
    }
  }

  function addDummies(wrap) {
    var blank = $('<div class="possible-card blank">');
    wrap.append(blank.clone(), blank.clone(), blank.clone());
  }

  function clearCards() {
    $('.possible-card-wrapper .possible-card').not(':first').remove();
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
    var url = _drt.site + obj.query;

    url += Hash.research(obj.slug);

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
    var data = {
      listTitle: 'TOP CATEGORIES',
      listType: 'category',
      listLines: [],
      query: '?_sfm_area_of_interest=',
    };
    _transArray(obj, data.listLines);
    return data;
  }

  function readCities(obj) {
    var data = {
      listTitle: 'TOP CITIES',
      listType: 'city',
      listLines: [],
      query: '?_sf_s=',
    };
    _transArray(obj, data.listLines);
    return data;
  }

  return {
    _: Nom,
    //
    addDummies: addDummies,
    clearCards: clearCards,
    dupeCard: dupeCard,
    findDupe: findDupe,
    genUrl: genUrl,
    gsReady: gsReady,
    readCategs: readCategs,
    readCities: readCities,
    search: Hash.search,
    research: Hash.research,
  };
});

/*

  #search-filter-form-3453
  #search-filter-results-3453

 */
