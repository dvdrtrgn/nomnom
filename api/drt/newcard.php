<?php
define('AUG2018', '1533081600');

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
require_once('../Card.php');

// get most recent post data and number of total posts

$card = new Card($pdo);
$card->get_latest();
$card->total_posts = Card::count_all($card->get_conn(), AUG2018);
echo json_encode($card);
