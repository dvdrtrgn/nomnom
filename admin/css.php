<?php

function drt_slug_css() {
  $url = DRT__PLUGIN_URL. '/style.css';

  echo "
  <style type='text/css'> @import url('$url'); </style>
  ";
}

add_action('admin_head', 'drt_slug_css');
