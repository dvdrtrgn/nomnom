<?php
  /*
    Plugin Name: -drt-mod
    Description: drt’s javascript helper plugin.
    Plugin URI: http://dvdrtrgn.com/plugins/drt-mod/
    Author: dvdrtrgn
    Author URI: http://dvdrtrgn.com/
    Version: 000
  */

  define('DRT__DBUG', $_COOKIE['drt_dbug']);
  $dbug = !empty(DRT__DBUG) ? DRT__DBUG == 1 : 0;

  $devUrl = [
    '',
    'http://10.94.211.163/js/',
    // '//localhost/wordpress/wp-content/plugins/drt-mod/public/',
  ][$dbug];

  define('DRT__PLUGIN', __FILE__); # /.../drt_index.php
  define('DRT__PLUGIN_DIR', plugin_dir_path(__FILE__)); # /unix/
  define('DRT__PLUGIN_URL', plugins_url('', __FILE__)); # http://url

  define('DRT__PUB_JS', DRT__PLUGIN_URL . '/public/');
  define('DRT__JS_BASE', $devUrl ? $devUrl : DRT__PUB_JS);

  if (is_admin()){
    require_once(DRT__PLUGIN_DIR . 'drt_admin.php');
  } else {
    require_once(DRT__PLUGIN_DIR . 'drt_require.php');
  }

  $Alert = "drt $devUrl";
