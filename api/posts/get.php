<?php
header('Content-Type: application/json');

require_once('../post.cls.php');

$card_id = !empty($_GET['id']) ? $_GET['id'] : 0;
$since = !empty($_GET['since']) ? $_GET['since'] : NULL;

$card = new Card($pdo, $card_id);
$card->total_posts = Card::count_all($card->get_conn(), $since);
echo json_encode($card);
