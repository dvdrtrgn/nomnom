<?php
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
