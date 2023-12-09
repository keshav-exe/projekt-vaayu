<?php
include("./database.php");

session_start();
if (!isset($_SESSION['auth']) || empty($_SESSION['auth'])) {
    header('location:/vaayu/login.php/');
    exit();
} else {
    $username = $_SESSION['user'];
    $sql = "SELECT * from users where user = '$username'";
    $query1 = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($query1);
    $_SESSION['uid'] = $row['uid'];

    if (isset($_POST['submit'])) {
        $title = filter_input(INPUT_POST, "title", FILTER_SANITIZE_SPECIAL_CHARS);
        $content = filter_input(INPUT_POST, "content", FILTER_SANITIZE_SPECIAL_CHARS);
        $uid = $_SESSION['uid'];

        $query = "INSERT INTO posts(title, content, user_id) VALUES ('$title', '$content', '$uid')";
        mysqli_query($conn, $query);

        header("location:/vaayu/posts.php/");
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vaayu - Notes Like Wind</title>
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
            </div>
        </nav>
        <div class="form-card" style="margin-top: 2em">
            <h1 class="form-logo">Create Post</h1>
            <form class="form" action="<?php htmlspecialchars($_SERVER["PHP_SELF"]) ?>" method="post">
                <div class="input-group">
                    <input required="" type="name" name="title" autocomplete="off" class="input"
                        value="An Interesting Title">
                    <label class="user-label">Title</label>
                </div>
                <div class="input-group">
                    <textarea name="content" class="input" cols="30" rows="30" required autocomplete="off"
                        style="resize:none; height: 100px;"></textarea>
                    <label class="user-label">Content</label>
                </div>
                <input class="form-button" type="submit" name="submit" value="Post"><br>
            </form>
        </div>
        <footer>
            All Rights Reserved to <a href="/vaayu/home.php/"> Vaayu</a> 2023
        </footer>
    </div>
</body>

<style>
    <?php include "style/style.css" ?>
    <?php include "style/posts.css" ?>
    <?php include "style/forms.css" ?>
</style>

</html>

<?php
mysqli_close($conn);

?>