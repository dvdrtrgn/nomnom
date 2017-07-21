<?php

  $ALERT = 'drt message';

  function drt_rando() {
    $str = 'A  B  C  D  E  F';
    $str = explode('  ', $str);
    $str = $str[mt_rand(0, count($str) - 1)];
    return wptexturize($str);
  }

  function drt_slug() {
    global $ALERT;
    $str = drt_rando() . ") $ALERT";
    echo "<div id='drt_slug'> $str </div>";
  }

  add_action('admin_notices', 'drt_slug');
