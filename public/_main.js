// EXPOSE jQuery
if (typeof window.jQuery === 'function') {
  define('jquery', function () {
    return window.$ = window.jQuery;
  });
} else require(['jquery'], function ($) {
  window.$ = $;
});

require.config({
  // baseUrl: '..',
  paths: {
    // lib: 'libs',
  },
  shim: {},
});


require(['dostuff'], function (dostuff) {
  dostuff();
});
