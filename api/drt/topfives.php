<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once('../Card.php');

// get top 5 cities and categories

$FILTER_TOP_GET = array('area_of_interest', 'city');
$res = array();

foreach($FILTER_TOP_GET as $item) {
  $res[$item] = Card::get_top($pdo, $item, 5);
}

echo json_encode($res);
