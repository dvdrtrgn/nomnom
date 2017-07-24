<?php

  $Alert = 'drt require';

  function drt_req_main() {
    $run = DRT__JS_MAIN;
    $req = DRT__PLUGIN_URL. '/public/libs/require.js';
    echo "<script src='$req' data-main='$run'></script>";
  }

  add_action('wp_footer', 'drt_req_main');
