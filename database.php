<?php

$db_server = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "vieu_db";
$conn = "";

try {
    $conn = mysqli_connect(
        "$db_server",
        "$db_user",
        "$db_pass",
        "$db_name"
    );
} catch (mysqli_sql_exception $e) {
    echo $e;
}

error_reporting(E_ALL); // Error/Exception engine, always use E_ALL

ini_set('ignore_repeated_errors', TRUE); // always use TRUE

ini_set('display_errors', FALSE); // Error/Exception display, use FALSE only in production environment or real server. Use TRUE in development environment

ini_set('log_errors', TRUE); // Error/Exception file logging engine.
ini_set('error_log', 'website/errors.log/');
error_log("shit!"); // Logging file path
