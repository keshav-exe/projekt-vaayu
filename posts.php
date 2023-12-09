<?php
include("./database.php");
session_start();

if (!isset($_SESSION['auth']) || empty($_SESSION['auth'])) {
    header('location:/vaayu/login.php/');
    exit();
}

$username = $_SESSION['user'];
$sql = "SELECT * FROM users WHERE user = '$username'";
$query1 = mysqli_query($conn, $sql);
$row = mysqli_fetch_array($query1);
$_SESSION['uid'] = $row['uid'];
$uid = $_SESSION['uid'];

$user = $_SESSION['user'];
$username = $_SESSION['username'];
$uid = $_SESSION['uid'];
$query = "SELECT * FROM users WHERE user = '$user'";
$query1 = "SELECT * FROM posts WHERE user_id = '$uid'";

$sql = mysqli_query($conn, $query);
$sql1 = mysqli_query($conn, $query1);

$rowr = mysqli_fetch_array($sql);
$result = mysqli_num_rows($sql1);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account | Vaayu</title>
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
    <div class="container">
        <nav>
            <div class="navbar">
                <a href="/vaayu/home.php/" class="logo">vaayu</a>
                <?php if (!$_SESSION['auth']): ?>
                    <a href="/vaayu/login.php">
                        <li class="nav-button">
                            <i class="fa-regular fa-user icon"></i> Login
                        </li>
                    </a>
                <?php else: ?>
                    <a href="/vaayu/logout.php/">
                        <li class="nav-button">
                            <i class="fa fa-arrow-right-from-bracket icon"></i> Logout
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
            </div>
        </nav>
        <h1 class="title">Welcome,
            <?php echo $_SESSION['username']; ?>
        </h1>
        <?php if ($result == 0): ?>
            <h1>No Posts Available. Post Something Now 🎯</h1>
        <?php else: ?>
            <div class="cards">
                <div class="wrap">
                    <?php
                    while ($row = mysqli_fetch_array($sql1)):
                        ?>
                        <div class="card">
                            <div class="card-content">
                                <div class="card-top">
                                    <span class="card-title">
                                        <?php echo $row['title']; ?>
                                    </span>
                                    <p>
                                        <?php echo $rowr['username']; ?>
                                    </p>
                                </div>
                                <div class="card-bottom">
                                    <p>
                                        <?php echo $row['post_dt']; ?>
                                    </p>

                                </div>
                            </div>
                            <div class="card-text">
                                <?php echo $row['content'] ?>
                            </div>
                        </div>
                    <?php endwhile; ?>
                </div>
            </div>
        <?php endif ?>
        <a href="/vaayu/createPost.php">
            <li class="new-post">
                <i class="fa-solid fa-plus"></i> New Post
            </li>
        </a>
        <footer>
            All Rights Reserved to <a href="/vaayu/home.php/"> Vaayu</a> 2023
        </footer>
    </div>
</body>

<style>
    <?php include "style/style.css" ?>
    <?php include "style/posts.css" ?>
</style>

</html>

<?php
mysqli_close($conn);

?>