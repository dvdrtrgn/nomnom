<?php

  $Alert = 'drt require';

  function drt_req_main() {
    $req = DRT__PLUGIN_URL . '/public/vendors/require.min.js';
    $base = DRT__JS_BASE;
    $main = $base . '_main.js';

    $_drt = array(
      'base' => $base,
      'main' => $main,
    );

    wp_enqueue_script('drtReq', $req, array('jquery'), '000');

    wp_enqueue_script('drtMain', $main, array('drtReq'), '000');
    wp_localize_script('drtMain', '_drt', $_drt);
  }

  add_action('wp_footer', 'drt_req_main');
