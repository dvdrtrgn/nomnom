<?php

  $Alert = 'drt require';

  function drt_req_main() {
    $req = DRT__PLUGIN_URL . '/public/libs/require.js';
    $base = DRT__JS_BASE;
    $main = $base . '_main.js';

    $_drt = array(
      'req' => $req,
      'base' => $base,
      'main' => $main,
    );

    wp_enqueue_script('drt_req', $req, array('jquery'), '0.0');

    wp_enqueue_script('drt_main', $main, array('drt_req'), '0.0');
    wp_localize_script('drt_main', '_drt', $_drt);
  }

  add_action('wp_footer', 'drt_req_main');
