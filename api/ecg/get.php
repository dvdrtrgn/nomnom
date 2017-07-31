<?php
header('Content-Type: application/json');

require_once('../post.cls.php');
require_once('cfg.php');

$card_id = !empty($_GET['id']) ? $_GET['id'] : 0;

$card_ids = !empty($_COOKIE['card_post_ids']) ? explode('%2C', $_COOKIE['card_post_ids']) : array();
$res = array();

foreach($card_ids as $id) {
	$res[] = new Card($pdo, $id);
}

// $card = new Card($pdo, $card_id);
$card->total_posts = Card::count_all($card->get_conn(), FILTER_START_DATE);
echo json_encode($res);
