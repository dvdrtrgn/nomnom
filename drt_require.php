<?php

  $Alert = 'drt require';

  function drt_req_main() {
    $req = DRT__PLUGIN_URL . '/public/libs/require.js';
    $base = DRT__JS_BASE;
    $main = DRT__JS_BASE . '_main.js';

    $_drt = array(
      'req' => $req,
      'base' => $base,
      'main' => $main,
      // 'dev' => DRT__DEV_JS,
      // 'pub' => DRT__PUB_JS,
    );

    wp_enqueue_script('drt_req', $req, array('jquery'), '0.0');
    wp_enqueue_script('drt_main', $main, array('drt_req'), '0.0');
    wp_localize_script('drt_main', '_drt', $_drt);
  }

  add_action('wp_footer', 'drt_req_main');
