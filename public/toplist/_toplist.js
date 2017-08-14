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
      'http://localhost/wordpress/',
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
        Formtool.filter(data.val);
      }
    });

    return $link;
  }

  function lineMaker(data) {
    var $line = $('<li>').data(Nom, data);
    $line.append(makeLink(data));
    return $line;
  }

  function addList(ele) {
    var list = ele.find('ol');
    var data = ele.data(Nom);

    data.listLines.forEach(function (line) {
      var obj = {
        text: line.label,
        count: line.val,
        filter: data.listType,
        query: data.query,
        val: line.key,
        slug: data.querytmpl.replace('#', line.label),
      };
      list.append(lineMaker(obj));
    });
  }

  function makeArticle(data) {
    var $wrap = $('<article>');
    var $head = $('<b>').html(data.listTitle);
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

    El.categs = makeArticle(Data.categs);
    El.cities = makeArticle(Data.cities);
    El.toplist = Help.dupeCard(Help.findDupe());
    El.toplist.empty().append(El.cities, El.categs);

    addList(El.categs);
    addList(El.cities);
    insertToplist();
  }

  function init() {
    if (~Df.homes.indexOf(_drt.site)) {
      Help.gsReady(false);

      $.loadCss(_drt.base + 'toplist/toplist.css');

      Endpoint(Df.points.top5, useData);
      $(document).on('sf:ajaxfinish', insertToplist);
      $(document).on('sf:ajaxstart', Help.clearCards);
    }

    return {
      _: Nom,
      _Endpoint: Endpoint,
      _Formtool: Formtool,
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
