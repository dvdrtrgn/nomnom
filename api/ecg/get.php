<?php
header('Content-Type: application/json');
require_once('../post.cls.php');

// get my likes
// COOKIE['card_post_ids'] stores ids of posts this browser made

$card_id = !empty($_GET['id']) ? $_GET['id'] : 0;

$card_ids = !empty($_COOKIE['card_post_ids']) ? explode(',', $_COOKIE['card_post_ids']) : array();
$res = array();

foreach($card_ids as $id) {
  $card = new Card($pdo, $id);
  $card->total_posts = Card::count_all($card->get_conn());
  $res[] = new Card($pdo, $id);
}
echo json_encode($res);
