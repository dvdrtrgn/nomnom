<?php
header('Content-Type: application/json');
require_once('../post.cls.php');

// get top 5 cities and categories

define("FILTER_TOP_NUM", 5);
$FILTER_TOP_GET = array('area_of_interest', 'city');
$res = array();

foreach($FILTER_TOP_GET as $item) {
  $res[$item] = Card::get_top($pdo, $item, FILTER_TOP_NUM);
  $res["${item}_s"] = array();
  foreach($res[$item] as $key=>$val) {
    $key_s = sprintf('"%s,"', $key);
    $res["${item}_s"][$key_s] = $val;
  }
}

echo json_encode($res);
