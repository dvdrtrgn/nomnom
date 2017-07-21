<?php
  /*
    Plugin Name: drt-mod
    Description: drt’s javascript helper plugin.
    Plugin URI: http://dvdrtrgn.com/plugins/drt-mod/
    Author: dvdrtrgn
    Author URI: http://dvdrtrgn.com/
    Version: 0.1.0
  */

  define('DRT__PLUGIN', __FILE__); // E) /Users/.../drt_index.php
  define('DRT__PLUGIN_DIR', plugin_dir_path(__FILE__)); // /Users/.../drt-mod/
  define('DRT__PLUGIN_URL', plugins_url('', __FILE__)); // http://localhost/.../drt-mod
  define('DRT__DEV_URL', 'http://10.94.211.163');

  $ALERT = 'drt index';


  if (is_admin()){
    // require_once(DRT__PLUGIN_DIR . 'drt_message.php');
    // require_once(DRT__PLUGIN_DIR . 'drt_style.php');
  } else {
    // require_once(DRT__PLUGIN_DIR . 'drt_require.php');
  }
