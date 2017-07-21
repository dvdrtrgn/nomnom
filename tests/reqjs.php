<?php

// http://kaidez.com/requirejs-wordpress/#jquery-requirejs-wordpress
if (typeof jQuery === 'function') {
  define('jquery', function () { return jQuery; });
}

/*

//Now require your code:
require(['app'], function (){});
