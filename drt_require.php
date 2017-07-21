<?php

  $ALERT = 'drt require';

  function drt_req_main() {
    $cfg = DRT__PLUGIN_URL. '/public/config';
    $url = DRT__DEV_URL . '/vendors/require.min.js';
    echo "<script type='text/javascript' src='$url' data-main='$cfg'></script>";
  }

  add_action('plugins_loaded', 'drt_req_main');
