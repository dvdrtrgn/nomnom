/*globals _drt, define, */
define([], function () {
  'use strict';

  var NOM = 'hash';
  var W = window;
  var C = W.console;

  // - - - - - - - - - - - - - - - - - -

  function Hash(obj) {
    var self = this;
    if (!self || self.constructor !== Hash) {
      return new Hash(obj);
    }
    var aL = self.left = [];
    var aR = self.right = [];

    function init(obj) {
      for (var i in obj) {
        aL.push(i);
        aR.push(obj[i]);
      }
      delete self.init;
      return self;
    }

    function _seek(key, a1, a2) {
      key = key || undefined;
      return a2[a1.indexOf(key)] || key;
    }

    self.init = init;
    self.search = function (key) {
      return _seek(key, aL, aR);
    };
    self.research = function (key) {
      return _seek(key, aR, aL);
    };
    if (obj) init(obj);
  }

  var hash = {
    _: NOM,
    '.': function () {},
    animal_welfare: 'Animal Welfare',
    arts_culture: 'Arts & Culture',
    child_youth_development: 'Child and Youth Development',
    disease_related_issues: 'Disease-Related Issues',
    diversity_inclusion: 'Diversity & Inclusion',
    education: 'Education',
    environmental: 'Environmental',
    human_services: 'Human Services',
    religious_institutions: 'Religious Institutions',
    workforce_development: 'Workforce Development',
    other: 'Other',
    undefined: 'All Items',
  };

  hash = Hash(hash);
  return hash;

});
