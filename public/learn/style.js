define(['jqxtn'], function ($) {
  'use strict';
  // make custom properties easy to access
  var W = window;
  var C = W.console;

  var DF = {};
  var EL = {};

  function make(El) {
    El = El || document;
    var api = {
      get: function (nom) {
        // bodyStyles.getPropertyValue
        return El.getPropertyValue(nom);
      },
      set: function (nom, val) {
        El.style.setProperty(nom, val);
      },
      comp: function () {
        return window.getComputedStyle(El); // all styles?
      },
    };

    return api;
  }

  function init() {
    $.reify(EL);

    var api = {
      $: $,
      DF: DF,
      EL: EL,
      new: make,
    };

    return api;
  }

  return init(function () {});
});

/*
  document
    html
      head
      body

  document.styleSheets
  document.body.style
  document.documentElement.style  (html)

  You can use document.body.style.setProperty('--name', value);:
  var bodyStyles = window.getComputedStyle(document.body);
  var fooBar = bodyStyles.getPropertyValue('--foo-bar'); //get
  document.body.style.setProperty('--foo-bar', newValue);//set

*/
