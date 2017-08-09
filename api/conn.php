<?php
require_once('../../wp-config.php');

$host       = DB_HOST;
$db         = DB_NAME;
$user       = DB_USER;
$pass       = DB_PASSWORD;
$charset    = DB_CHARSET;

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE               => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE    => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES      => false,
];
$pdo = new PDO($dsn, $user, $pass, $opt);
