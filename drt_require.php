<?php

  $Alert = 'drt require';

  function drt_req_main() {
    $dev = DRT__JS_MAIN;
    // wp_enqueue_script('jquery');
    $url = DRT__PLUGIN_URL. '/public';
    echo "<script src='$url/require.js' data-main='$dev'></script>";
  }

  add_action('wp_footer', 'drt_req_main');
