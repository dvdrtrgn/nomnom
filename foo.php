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

function hello_foo_get_lyric2() {
	/** These are the lyrics to Hello Foo */
	$lyrics = "Well, hello, Foo
You're lookin' swell, Foo
Foo'll never go away again";

	// Here we split it into lines
	$lyrics = explode( "\n", $lyrics );

	// And then randomly choose a line
	return wptexturize( $lyrics[ mt_rand( 0, count( $lyrics ) - 1 ) ] );
}
function hello_foo_get_lyric() {
  $msg = get_template_directory_uri() . '/library/myscript.js';

  /// find way to get plugin dir

	return wptexturize( $msg );
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

add_action('admin_head', 'foo_css');

//////////
//////////
//////////
//////////

wp_register_script('require', 'http://10.94.211.163/tempkit/0/vendors/require.js/require.js', array(), '0.1');
wp_register_script('mydef', 'http://10.94.211.163/tempkit/0/scripts/_def_.js', array(), '0.1', true);

// wp_enqueue_script( $handle, $src, $deps, $ver, $in_footer );

wp_register_script('config',
  'http://10.94.211.163/tempkit/0/config.js',
  array('require'), '0.1');

wp_register_script('jqxtn',
  'http://10.94.211.163/tempkit/0/scripts/libs/jq-xtn.js',
  array('jquery'), '0.1', true);

// Easy way to link to external JS library and use it easily in project:
wp_register_script('roman',
  'http://10.94.211.163/tempkit/0/scripts/libs/dt-roman.js',
  array('mydef', 'jqxtn'), '0.1', true);

// this will put the someScript.js at the bottom of our HTML file before
wp_enqueue_script(array('config', 'roman'));

/*

  function test(R) {
    $('li.roman a').on ('click', function () {
      var num = Math.round(Math.random() * 5000);
      C.debug('Arabic ' + num + ' = Roman', R.convert(num));
    });
  }
