<?php

  $ALERT = 'drt style';

  function drt_slug_css() {
    $url = DRT__PLUGIN_URL. '/public/style.css';
    echo "<style type='text/css'> @import url('$url'); </style>";
  }

  add_action('admin_notices', 'drt_slug_css');
