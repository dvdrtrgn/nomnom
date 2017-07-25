/*globals _drt */

window.console.log('PHP', [_drt]);

if (typeof window.jQuery === 'function') {
  define('jquery', function () {
    return window.jQuery;
  });
}

require.config({
  baseUrl: _drt.base,
  paths: {
    jqxtn: 'libs/jq-xtn',
  },
  shim: {},
});


require(['dostuff'], function (dostuff) {
  dostuff();
});
