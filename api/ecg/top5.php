<?php
header('Content-Type: application/json');

require_once('../post.cls.php');
require_once('cfg.php');

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
