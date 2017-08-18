///
//factory.js
/*globals

  CHANGED: 2017-08-18
  IDEA: demonstate a model factory

  CLASS
    new:    inst Factory
    run:    Factory:foo()

  INSTANCE
    processData:   worker method

 */
define(['jquery', 'lodash', 'util',
], function ($, _, U) {
  'use strict';

  const NOM = 'Factory';
  const W = window;
  const C = W.console;
  const DF = {
    inited: false,
    main: 'body',
  };
  const EL = {
    body: DF.main,
  };
  const API = {
    __: NOM,
    dbug: 1,
    DF,
    EL,
  };

  // - - - - - - - - - - - - - - - - - -
  // DECLARE

  const round0 = (n, f = 1, d = 1, a = 0) => Math.round(n * f) / d + a;
  const rounds = (num) => Math.abs(num) > 1 ? num : round0(num, 50, 1, 50);

  function foo(api, str) {
    return api[rounds(str)];
  }

  // - - - - - - - - - - - - - - - - - -
  // CONSTRUCT

  function extend(api) { // Extend the worker

    Object.defineProperties(api, {
      processData: {
        value: (str) => foo(api, str),
      },
    });

  }

  function Factory() { // Simulate a constructor
    if (!DF.inited) throw `${NOM} not yet inited`;

    const api = Object.create(API);
    extend(api);

    if (API.dbug) C.log('Factory worker', api);
    return api;
  }

  // - - - - - - - - - - - - - - - - - -
  // INIT

  function init() { // Kickoff any dom ready ops
    U.reify(EL);
    DF.inited = true;
  }

  U.apiExpose(API, arguments, { // Extend the factory
    new: Factory,
    run: foo,
  });

  // - - - - - - - - - - - - - - - - - -
  $(init);

  return API;
});

/*



 */
