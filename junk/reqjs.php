<?php


// wp_enqueue_script('log', 'http://adp/js/log.js', [], 1, true);
// wp_enqueue_script('req', DRT__SERV . 'vendors/require.min.js', [], 1, true);

// http://kaidez.com/requirejs-wordpress/#jquery-requirejs-wordpress
if (typeof jQuery === 'function') {
  define('jquery', function () { return jQuery; });
}

/*

//Now require your code:
require(['app'], function (){});
