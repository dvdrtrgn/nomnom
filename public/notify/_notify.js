define(['./xtn_jq', './hash', './cookie'], function ($, hash, cookie) {
  var W = window;
  var C = W.console;
  var X = W._drt;

  X.hash = hash;
  X.cookie = cookie;
  X.site = W.location.href;

  if (~X.site.indexOf('?')) {
    return;
  }

  $.loadCss(`${X.base}/notify/style.css`);

  var data = {
    cities: '[["TOP CITIES","city"],["Minneapolis",100],["Charlotte",87],["Des Moines",77],["San Francisco",67],["Chicago",57]]',
    categories: '[["TOP CATEGORIES","category"],["Diversity & Inclusion",100],["Animal Welfare",87],["Arts & Culture",77],["Environmental",67],["Human Services",57]]',
  };

  function initData(data) {
    function trigFilter(evt) {
      evt.preventDefault();
      var ele = $(this);
      var dat = ele.data('Filter');
      var url = X.site;

      url += 'search-results/' + hash.search(dat.filter);
      url += encodeURIComponent(hash.research(dat.term));
      W.location = url;
    }

    function makeItem(arr, filter) {
      var li = $('<li>');
      var dat = {
        filter: filter,
        term: arr[0],
        count: arr[1],
      };

      li.html(`<a href="#">${dat.term} (${dat.count} posts)</a>`);
      li.on('click', trigFilter).data('Filter', dat);
      return li;
    }

    function makeArticle(obj) {
      var h1 = $('<b>').html(obj.title);
      var ol = $('<ol>');
      var div = $('<article>').append(h1, ol);

      obj.list.forEach(function (item) {
        ol.append(makeItem(item, obj.filter));
      });

      return div;
    }

    function prepData(str) {
      var data = JSON.parse(str);
      var init = data.shift();
      var arg = {
        title: init[0],
        filter: init[1],
        list: data,
      };
      window.console.log(arg);
      return makeArticle(arg);
    }

    data.cities = prepData(data.cities);
    data.categories = prepData(data.categories);
    return data;
  }

  function dupeCard() {
    var sels = '.gallery > .gallery-item, .possible-card-wrapper .possible-card';
    var card = $(sels).eq(2);
    var dupe = card.clone();

    if (dupe.is('.dupe')) {
      dupe = card;
    } else {
      dupe.addClass('dupe').insertBefore(card);
    }
    return dupe.empty();
  }

  data = initData(data);
  dupeCard().append(data.cities, data.categories);

});
