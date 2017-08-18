///
//lib/util.es6
/*globals

  CHANGED: 2017-08-01
  IDEA: base for util functions

*/
define(['jquery', 'lodash'], function ($, _) {
  const NOM = 'Util';
  const rand = (lo, hi) => Math.floor((hi - lo + 1) * Math.random()) + lo;
  const round = (n, d) => Math.round(n * (d = Math.pow(10, d))) / d;
  const undef = (x) => typeof x === 'undefined';
  const percent = (num) => (round(num, 2) * 100) | 0;
  const collisions = (o, a) => a.filter(k => k in o && typeof o[k] === 'function');
  const noop = () => {};

  function allkeys(obj) {
    const arr = [];
    for (let i in obj) arr.push(i);
    return arr;
  }

  function apiExpose(api, args, etc) {
    var imports = Object.create(null);
    expando(api, etc);
    [...args].forEach(function (e) {
      var nom = e['__'];
      nom = typeof nom === 'string' ? nom : 'anon';
      if (e === $) nom = 'jquery';
      if (e === _) nom = 'lodash';
      imports[nom] = e;
    });
    api[''] = imports;
  }

  function checkCollision(o1, o2) {
    const all = collisions(o1, allkeys(o2));
    if (all.length) throw Error(`collisions: ${all}`);
  }

  function expando(obj, ...args) {
    const exp = _.extend({}, ...args);
    checkCollision(obj, exp);
    _.extend(obj, exp);
  }

  function fastarrclone(arr) {
    let [i, o] = [arr.length, new Array(arr.length)];
    while (i--) o[i] = arr[i];
    return o;
  }

  function flattarr(arr) {
    let flat = (acc, x) => Array.isArray(x) ? x.reduce(flat, acc) : acc.push(x) && acc;
    return arr.reduce(flat, []);
  }

  function reify(obj) { // replace vals(selectors) with query
    return $.each(obj, function (i, sel) {
      if (sel && typeof sel === 'object') sel = sel.selector;
      (obj[i] = $(sel)).selector = sel;
    });
  }

  return {
    __: NOM,
    allkeys,
    apiExpose,
    checkCollision,
    expando,
    fastarrclone,
    flattarr,
    noop,
    percent,
    rand,
    reify,
    round,
    undef,
  };
});
