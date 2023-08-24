<?php
include("./database.php");

$err_welcome = "";

session_start();
if (!$_SESSION['auth']) {
    header('location:/website/login.php/');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account | Vaayu</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://kit.fontawesome.com/054483bc4b.js" crossorigin="anonymous"></script>
</head>

<body>
    <nav>
        <div class="navbar">
            <a href="/website/home.php/" class="logo left">vaayu</a>
            <li><a href="/website/home.php/">Home</a></li>
            <li><a href="">Posts</a></li>
            <li><a href="">FAQ</a></li>
            <li><a href="">Contact</a></li>
            <li><a href="/website/logout.php/" class="button acc-btn"><i class="fa fa-arrow-right-from-bracket icon"></i></a></li>
        </div>
    </nav>
    <?php if (isset($_SESSION['auth'])) : ?>
        <h3>
            <?php
            echo $_SESSION['success'];
            unset($_SESSION['success']);
            ?>
        </h3>
    <?php endif ?>
    <?php if (isset($_SESSION['username'])) : ?>
        <div class="err">Welcome
            <?php echo $_SESSION['username']; ?>
        </div>;
    <?php endif ?>
    <div class="container">
        <i class="fa-solid fa-triangle-exclamation"></i>
        site underconstruction
    </div>
</body>
<footer>
    All Rights Reserved to <a href="/website/home.php/"> Vieu</a> 2023
</footer>

<style>
    <?php include "style/style.css" ?>
</style>

</html>

<?php
mysqli_close($conn);
require "./check.php";
?>