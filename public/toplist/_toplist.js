/*globals _drt */
define(['jqxtn', './help', 'lib/endpoint',
], function ($, Help, Endpoint) {
  'use strict';

  var Nom = '_toplist';
  var W = window;
  var C = W.console;
  var Df = {
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

  function makeLine(data) {
    var $line = $('<li>');
    var $link = $('<a>');
    var text = Help.search(data.term);

    $link.attr('href', Help.genUrl(data));
    $link.text(text + ' (' + data.count + ' posts)');

    $line.data(Nom, data);
    $line.append($link);
    return $line;
  }

  function addLines(ele, lineFn) {
    var list = $(ele).find('ol');
    var data = list.data(Nom);

    data.strings.forEach(function (item) {
      var obj = {
        filter: data.filter,
        term: item[0],
        count: item[1],
      };
      list.append(lineFn(obj));
    });
  }

  function makeArticle(data) {
    var $wrap = $('<article>');
    var $head = $('<b>').html(data.title);
    var $list = $('<ol>');

    $wrap.data(Nom, data);
    $wrap.append($head, $list);
    return $wrap;
  }

  function insertToplist() {
    var card = Help.findDupe();
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

    addLines(El.cities, makeLine);
    addLines(El.categs, makeLine);

    $(document).on('sf:ajaxfinish', insertToplist);
    insertToplist();
  }

  function init() {
    if (~Df.homes.indexOf(_drt.site)) {
      Help.gsReady(false);

      $.loadCss(_drt.base + 'toplist/toplist.css');

      Endpoint(Df.points.top5, useData);

      El.toplist = Help.dupeCard(Help.findDupe());
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



 */
