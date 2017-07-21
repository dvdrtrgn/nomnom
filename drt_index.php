<?php
/*
  Plugin Name: drt-mod
  Description: drt’s javascript helper plugin.
  Plugin URI: http://dvdrtrgn.com/plugins/drt-mod/
  Author: dvdrtrgn
  Author URI: http://dvdrtrgn.com/
  Version: 0.1
*/

define('DRT__SERV', 'http://10.94.211.163');
define('DRT__PLUGIN', __FILE__);

define('DRT__PLUGIN_DIR', plugin_dir_path(__FILE__));
define('DRT__PLUGIN_URL', plugins_url('', __FILE__)); // http://localhost/.../drt-mod

include('admin/msg.php');
include('admin/css.php');

if (is_admin()){
  $url = DRT__PLUGIN_DIR . 'admin/etc.php';
  require_once($url);
} else {
  include('util/req.php');
}
