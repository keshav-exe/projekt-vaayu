<?php
session_start();
session_unset();
session_destroy();

// Expire the session cookie immediately
setcookie(session_name(), '', 1);

header('location:/vaayu/home.php');
exit();
?>