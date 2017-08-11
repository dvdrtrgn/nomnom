/*globals _drt */
define(['jqxtn', './help', 'lib/endpoint', 'lib/formtool',
], function ($, Help, Endpoint, Formtool) {
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

  function makeLink(data) {
    var $link = $('<a>');

    $link.attr('href', Help.genUrl(data));
    $link.text(data.text + ' (' + data.count + ' posts)');

    $link.on('click', function (evt) {
      if (data.filter === 'city') {
        evt.preventDefault();
        Formtool.search(data.slug);
      }
      if (data.filter === 'category') {
        evt.preventDefault();
        Formtool.filter(Help.research(data.term));
      }
    });

    return $link;
  }

  function genLineMaker(wrap) {
    return function (data) {
      data.text = Help.search(data.term);
      data.slug = wrap.replace('#', data.text);

      var $line = $('<li>').data(Nom, data);

      $line.append(makeLink(data));

      return $line;
    };
  }

  function addList(ele, lineFn) {
    var list = $(ele).find('ol');
    var data = $(ele).data(Nom);

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

    El.toplist
      .clone(true) // filter action in msie 11 destroys elements
      .insertAfter(card).css('visibility', 'visible');
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

    addList(El.cities, genLineMaker('#,'));
    addList(El.categs, genLineMaker('#'));

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
