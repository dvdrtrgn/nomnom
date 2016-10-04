<?php
/**
 * @package Hello_Foo
 * @version 1.6
 */
/*
Description: This is not just a plugin.
Plugin Name: Nom-nom
Plugin URI: http://wordpress.org/plugins/hello-foo/
Author: Matt Mullenweg
Author URI: http://ma.tt/
Version: 1.6
*/

function _hello_foo_get_lyric() {
  $msg = get_template_directory_uri() . '/library/myscript.js';

  /// find way to get plugin dir

	return wptexturize( $msg );
}

include('hello/msg.php');
include('hello/css.php');
