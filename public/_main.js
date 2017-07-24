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
    // lib: 'libs',
  },
  shim: {},
});


require(['dostuff'], function (dostuff) {
  dostuff();
});
