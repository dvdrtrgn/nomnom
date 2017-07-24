define([], function () {
  var W = window;
  var C = W.console;

  function Search() {
    var self = this;
    if (self.constructor !== Search) {
      return new Search();
    }

    var search = self.keys = {};
    search.sortBy = '_sfm_state';
    search.sortDir = 'asc';
    search.sortMeth = 'alpha';
    search.category = 'child_youth_development';
    search.searchTerm = 'x';

    function stringify() {
      var str = '?';
      // sort
      str += 'sort_order=';
      str += search.sortBy + '+';
      str += search.sortDir + '+';
      str += search.sortMeth;
      // area
      str += '&';
      str += '_sfm_area_of_interest=';
      str += search.category;
      // area
      str += '&';
      str += '_sf_s=';
      str += search.searchTerm;

      return str;
    }

    function parse() {
      throw 'Yet to implement';
    }

    this.stringify = stringify;
    this.parse = parse;
  }

  var search = Search();
  var test = '?sort_order=_sfm_state+asc+alpha&_sfm_area_of_interest=child_youth_development&_sf_s=x';

  window.console.assert(test === search.stringify());

  return search;
});
