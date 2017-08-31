<?php

  $Alert = 'drt require';

  function drt_req_main() {
    $base = DRT__JS_BASE;
    $load = $base . '_load.js';

    $_drt = array(
      'base' => $base,
      'dbug' => DRT__DBUG,
    );

    wp_enqueue_script('drtMain', $load, array('jquery'), '000');
    wp_localize_script('drtMain', '_drt', $_drt);
  }

  add_action('wp_footer', 'drt_req_main');
