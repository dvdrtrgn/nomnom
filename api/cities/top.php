<?php
header('Content-Type: application/json');

require_once('../post.cls.php');

$num = !empty($_GET['num']) ? $_GET['num'] : 5;
$since = !empty($_GET['since']) ? $_GET['since'] : NULL;

$res = Card::get_top($pdo, 'city', $num, $since);
echo json_encode($res);
