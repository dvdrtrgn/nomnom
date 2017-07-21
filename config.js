require.config({
  baseUrl: 'scripts',
  paths: {
    lib: 'libs',
    // jquery: '../vendors/jquery/jquery.min',
    // lodash: '../vendors/lodash.js/lodash.min',
  },
  shim: {
    // jqmobi: {
    // deps: ['jquery'],
    // exports: '$',
    // },
  },
});

if (typeof window.jQuery === 'function') {
  define('jquery', function () { return window.jQuery; });
  window.console.log('jq already there!');
}
