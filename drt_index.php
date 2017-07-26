<?php
  /*
    Plugin Name: -drt-mod
    Description: drt’s javascript helper plugin.
    Plugin URI: http://dvdrtrgn.com/plugins/drt-mod/
    Author: dvdrtrgn
    Author URI: http://dvdrtrgn.com/
    Version: 000
  */

  $Live = 1;
  $Temp = [
    'http://10.94.211.163/js/',
    '//localhost/wordpress/wp-content/plugins/drt-mod/public/',
  ];

  define('DRT__PLUGIN', __FILE__); # /.../drt_index.php
  define('DRT__PLUGIN_DIR', plugin_dir_path(__FILE__)); # /unix/
  define('DRT__PLUGIN_URL', plugins_url('', __FILE__)); # http://url

  define('DRT__DEV_JS', $Temp[1]);
  define('DRT__PUB_JS', DRT__PLUGIN_URL . '/public/');

  define('DRT__JS_BASE', $Live ? DRT__PUB_JS : DRT__DEV_JS);

  if (is_admin()){
    require_once(DRT__PLUGIN_DIR . 'drt_admin.php');
  } else {
    require_once(DRT__PLUGIN_DIR . 'drt_require.php');
  }

  $Alert = 'drt index';
