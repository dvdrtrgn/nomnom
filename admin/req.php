<?php

// wp_enqueue_script('log', 'http://adp/js/log.js', [], 1, true);
// wp_enqueue_script('req', DRT__SERV . 'vendors/require.min.js', [], 1, true);

function drt_req_main() {
  $url = DRT__SERV . '/vendors/require.min.js';
  $cfg = DRT__PLUGIN_URL. '/config';
  echo "
<script type='text/javascript'
  src='$url' data-main='$cfg'
></script>
  ";
}

add_action('plugins_loaded', 'drt_req_main');
