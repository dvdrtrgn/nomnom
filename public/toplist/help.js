/*globals _drt */
define(['jqxtn', './hash',
], function ($, Hash) {

  var Nom = 'help';
  var W = window;
  var C = W.console;

  function addDummies(wrap) {
    var blank = $('<div class="possible-card blank">');
    wrap.append(blank.clone(), blank.clone(), blank.clone());
  }

  function genUrl(obj) {
    var url = _drt.site;

    url += Hash.search(obj.filter); // 'search-results/' +
    url += encodeURIComponent(Hash.research(obj.term));

    return url;
  }

  function readCategs(obj) {
    var arr = [['TOP CATEGORIES', 'category']];

    for (var i in obj) {
      if (i) arr.push([Hash.search(i), obj[i]]); // turn keys into full text
    }
    return arr;
  }

  function readCities(obj) {
    var arr = [['TOP CITIES', 'city']];

    for (var i in obj) {
      if (i) arr.push([i, obj[i]]);
    }
    return arr;
  }

  return {
    _: Nom,
    //
    addDummies: addDummies,
    genUrl: genUrl,
    readCategs: readCategs,
    readCities: readCities,
    search: Hash.search,
  };
});

/*



 */
