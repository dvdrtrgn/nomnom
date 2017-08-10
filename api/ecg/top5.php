<?php
header('Content-Type: application/json');

require_once('../post.cls.php');
require_once('cfg.php');

$res = array();

foreach($FILTER_TOP_GET as $item) {
	$res[$item] = Card::get_top($pdo, $item, FILTER_TOP_NUM);
}

echo json_encode($res);