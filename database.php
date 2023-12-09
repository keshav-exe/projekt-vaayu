<?php
$db_server = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "vaayu_db";

$conn = mysqli_connect($db_server, $db_user, $db_pass, $db_name);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

error_reporting(E_ALL);
ini_set('ignore_repeated_errors', TRUE);
ini_set('display_errors', FALSE);
ini_set('log_errors', TRUE);
ini_set('error_log', 'vaayu/errors.log/');
error_log("shit!");
?>