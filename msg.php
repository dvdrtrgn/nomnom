<?php
//////////
//////////
//////////
//////////

function _hello_foo_get_lyric() {
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
