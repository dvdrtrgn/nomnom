/*globals _drt, define, */
define(['jqxtn', './help', 'lib/endpoint', 'lib/formtool',
], function ($, Help, Endpoint, Formtool) {
  'use strict';

  var NOM = '_toplist';
  var W = window;
  var C = W.console;

  // - - - - - - - - - - - - - - - - - -

  var DF = {
    homes: [
      'http://ecgsolutions.hosting.wellsfargo.com/marketing/csc/',
      'http://localhost/wordpress/',
    ],
    points: {
      top5: 'http://ecgsolutions.hosting.wellsfargo.com/marketing/api/drt/topfives.php',
    },
  };
  var EL = {
    categs: null,
    cities: null,
    toplist: null,
  };

  var Data = {
    categs: null,
    cities: null,
    raw: null,
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
    var $line = $('<li>').data(NOM, data);
    $line.append(makeLink(data));
    return $line;
  }

  function addList(ele) {
    var list = ele.find('ol');
    var data = ele.data(NOM);

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

    $wrap.data(NOM, data);
    $wrap.append($head, $list);
    return $wrap;
  }

  function insertToplist() {
    var card = Help.findDupe();
    var next = card.next();
    var wrap = card.parent();

    EL.toplist
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

    EL.categs = makeArticle(Data.categs);
    EL.cities = makeArticle(Data.cities);
    EL.toplist = Help.dupeCard(Help.findDupe());
    EL.toplist.empty().append(EL.cities, EL.categs);

    addList(EL.categs);
    addList(EL.cities);
    insertToplist();
  }

  function atHome() {
    var inlist = DF.homes.indexOf(_drt.site);
    return Boolean(~inlist); // not -1 (missing)
  }

  function init() {
    if (atHome()) {
      Help.gsReady(false);

      $.loadCss(_drt.base + 'toplist/toplist.css');

      Endpoint(DF.points.top5, useData);
      $(document).on('sf:ajaxfinish', insertToplist);
      $(document).on('sf:ajaxstart', Help.clearCards);
    }

    return {
      '': {
        NOM: NOM,
        closure: function () {},
      },
      _Endpoint: Endpoint,
      _Formtool: Formtool,
      _Help: Help,
      Data: Data,
      DF: DF,
      EL: EL,
    };
  }
  // console.dir(function toplist_scope() {});
  return init();
});

/*



 */
