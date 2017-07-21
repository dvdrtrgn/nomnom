<?php
/*
  Description: Mod-drt plugin.
  Plugin Name: Mod-drt
  Plugin URI: http://dvdrtrgn.com/plugins/mod-drt/
  Author: dvdrtrgn
  Author URI: http://dvdrtrgn.com/
  Version: 0.1
*/

define('DRT__SERV', 'http://10.94.211.163');
define('DRT__PLUGIN', __FILE__);

define('DRT__PLUGIN_DIR', plugin_dir_path(__FILE__));
define('DRT__PLUGIN_URL', plugins_url('', __FILE__));

include('util/msg.php');
include('util/css.php');

if (is_admin()){
  $str = DRT__PLUGIN_DIR . 'admin.php';
  require_once($str);
} else {
  include('util/req.php');
}
