<?php

  $Alert = 'drt admin';

  function drt_rando() {
    return mt_rand(0, 9);
  }

  function drt_slug() {
    global $Alert;
    $str = drt_rando() . ") $Alert";
    echo "<div id='drt_slug'> $str </div>";
  }

  function drt_slug_css() {
    $url = DRT__PLUGIN_URL. '/style.css';
    echo "<style type='text/css'> @import url('$url'); </style>";
  }

  add_action('admin_notices', 'drt_slug_css');
  add_action('admin_notices', 'drt_slug');
