/*globals _drt */
setTimeout(function () {
  'use strict';

  var script = document.createElement('script');
  // script.onload = function
  script.dataset.main = _drt.base + '_main.js';
  script.src = _drt.base + 'vendors/require.min.js';

  document.getElementsByTagName('head')[0].appendChild(script);
}, 999);
