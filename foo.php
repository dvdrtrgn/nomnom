<?php
/**
 * @package Hello_Foo
 * @version 1.6
 */
/*
Plugin Name: Hello Foo
Plugin URI: http://wordpress.org/plugins/hello-foo/
Description: This is not just a plugin.
Author: Matt Mullenweg
Version: 1.6
Author URI: http://ma.tt/
*/

function hello_foo_get_lyric() {
	/** These are the lyrics to Hello Foo */
	$lyrics = "Well, hello, Foo
You're lookin' swell, Foo
Foo'll never go away again";

	// Here we split it into lines
	$lyrics = explode( "\n", $lyrics );

	// And then randomly choose a line
	return wptexturize( $lyrics[ mt_rand( 0, count( $lyrics ) - 1 ) ] );
}

// This just echoes the chosen line, we'll position it later
function hello_foo() {
	$chosen = hello_foo_get_lyric();
	echo "<p id='foo'>$chosen</p>";
}

// Now we set that function up to execute when the admin_notices action is called
add_action( 'admin_notices', 'hello_foo' );

// We need some CSS to position the paragraph
function foo_css() {
	// This makes sure that the positioning is also good for right-to-left languages
	$x = is_rtl() ? 'left' : 'right';

	echo "
	<style type='text/css'>
	#foo {
		float: $x;
		padding-$x: 15px;
		padding-top: 5px;
		margin: 0;
		font-size: 11px;
	}
	</style>
	";
}

add_action( 'admin_head', 'foo_css' );

?>
