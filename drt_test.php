<?php

  $ALERT = 'drt test';

  function drt_scripts_method() {
    // wp_enqueue_script('jquery');
    $url = DRT__PLUGIN_URL. '/public';
    echo "<script src='$url/require.js' data-main='$url/config'></script>";
  }

  add_action('wp_footer', 'drt_scripts_method');
