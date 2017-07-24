<?php

  $ALERT = 'drt require';

  function drt_req_main() {
    $dev = DRT__DEV_URL . '/js/def.js';
    // wp_enqueue_script('jquery');
    $url = DRT__PLUGIN_URL. '/public';
    echo "<script src='$url/require.js' data-dev='$dev' data-main='$url/config'></script>";
  }

  add_action('wp_footer', 'drt_req_main');
