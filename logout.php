<?php

session_start();
session_unset();
session_destroy();
header('location:/website/login.php');
exit();
