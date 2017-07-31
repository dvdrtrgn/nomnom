<?php
header('Content-Type: application/json');

require_once('../post.cls.php');

$since = !empty($_GET['since']) ? $_GET['since'] : NULL;

$card = new Card($pdo);
$card->get_latest();
$card->total_posts = Card::count_all($card->get_conn(), $since);
echo json_encode($card);
