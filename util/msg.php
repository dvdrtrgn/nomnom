<?php

function drt_line_slug() {
  $str = "
  Slug A
  Slug B
  Slug C
  ";
  $str = explode("\n", $str);
  $str = $str[mt_rand(1, count($str) - 2)];
  return wptexturize($str);
}

function drt_line() {
  $str = drt_line_slug();
  echo "<p id='drt_slug'>$str</p>";
}

// set function for admin_notices event
add_action('admin_notices', 'drt_line');
