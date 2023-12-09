<?php
include("./database.php");

session_start();

$user = $_SESSION['user'] ?? null;

if ($user) {
    $query1 = "SELECT username FROM users WHERE user = ?;";
    $stmt = mysqli_prepare($conn, $query1);
    mysqli_stmt_bind_param($stmt, "s", $user);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $username);

    while (mysqli_stmt_fetch($stmt)) {
        $_SESSION['username'] = $username;
    }

    mysqli_stmt_close($stmt);
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vaayu</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://kit.fontawesome.com/054483bc4b.js" crossorigin="anonymous"></script>
    <script src="/vaayu/script.js"></script>
</head>

<body onload="document.body.style.opacity='1'">
    <div id="loading-screen">
        <div id="loading-spinner"></div>
    </div>

    <div id="non-responsive-message">
        This Web App is not Responsive. Please view it on a desktop device for the best experience.
    </div>
    <div class="container">
        <nav>
            <div class="navbar">
                <a href="/vaayu/home.php/" class="logo">vaayu</a>
                <ul>
                    <?php if (!$_SESSION['auth']): ?>
                        <a href="/vaayu/login.php">
                            <li class="nav-button">
                                <i class="fa-regular fa-user icon"></i>
                                Login
                            </li>
                        </a>
                    <?php else: ?>
                        <a href="/vaayu/posts.php">
                            <li class="nav-button">
                                <i class="fa-regular fa-pen-to-square"></i> Posts
                            </li>
                        </a>
                        <a href="/vaayu/account.php">
                            <li class="nav-button">
                                <?php if (!isset($_SESSION['username'])): ?>
                                    <i class="fa-regular fa-user icon"></i>
                                    <?php echo $_SESSION['user']; ?>
                                <?php elseif (isset($_SESSION['username'])): ?>
                                    <i class="fa-regular fa-user icon"></i>
                                    <?php echo $_SESSION['username']; ?>
                                <?php else: ?>
                                    <i class="fa-regular fa-user icon"></i>
                                    <?php echo 'Login' ?>
                                <?php endif ?>
                            </li>
                        </a>
                    <?php endif ?>
                </ul>
            </div>
        </nav>
        <div class="hero">
            <div class="hero-left">
                <h1>How Was Your Day?</h1>
                <p>Introducing <b>Vaayu</b>, Your Very Own Web Journal.</p>
            </div>
            <div class="hero-right"></div>
        </div>
        <footer>
            All Rights Reserved to <a href="/vaayu/home.php/">Vaayu</a> 2023
        </footer>
    </div>
    <script src="./script.js"></script>
</body>

<style>
    <?php include "style/style.css" ?>
    <?php include "style/posts.css" ?>
</style>

</html>

<?php
mysqli_close($conn);
?>