<?php

function drt_slug_css() {
  $dir = is_rtl() ? 'left' : 'right';

  echo "
  <style type='text/css'>
  #drt_slug {
    color: green;
    float: $dir;
    font-weight: bold;
    padding-$dir: 1em;
  }
  </style>
  ";
}

add_action('admin_head', 'drt_slug_css');
