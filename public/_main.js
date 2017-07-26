/*globals _drt */
var W = window;
var C = W.console;

C.log('PHP', _drt);

if (typeof W.jQuery === 'function') {
  define('jquery', function () {
    return W.jQuery;
  });
}

require.config({
  baseUrl: _drt.base,
  paths: {
    // jqxtn: 'libs/xtn_jq',
  },
  shim: {},
});

require([

  'notify/_notify',

], function () {
  // C.log(require.toUrl(''));
});
