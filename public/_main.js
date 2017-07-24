// EXPOSE jQuery
if (typeof window.jQuery === 'function') {
  define('jquery', function () {
    return window.jQuery;
  });
}

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
