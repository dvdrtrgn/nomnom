<?php
header('Content-Type: application/json');

require_once('../post.cls.php');
require_once('cfg.php');


$card = new Card($pdo);
$card->get_latest();
$card->total_posts = Card::count_all($card->get_conn());
echo json_encode($card);
