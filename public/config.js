var W = window;
var C = W.console;

require.config({
  // baseUrl: '..',
  paths: {
    // lib: 'libs',
  },
  shim: {},
});

if (typeof W.jQuery === 'function') {
  define('jquery', function () {
    return W.$ = W.jQuery;
  });
} else require(['jquery'], function ($) {
  W.$ = $;
});

require(['dostuff'], function (dostuff) {
  dostuff();
});
