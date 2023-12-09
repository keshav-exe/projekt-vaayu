<?php
include("./database.php");
session_start();

if (!$_SESSION['auth']) {
    header('location:/vaayu/login.php/');
    exit();
} else {
    if (isset($_POST["submit"])) {
        $newUsername = filter_input(INPUT_POST, "updateUsername", FILTER_SANITIZE_SPECIAL_CHARS);
        $newUser = filter_input(INPUT_POST, "updateUser", FILTER_SANITIZE_SPECIAL_CHARS);
        $loggedInUsername = $_SESSION['username'];
        $loggedInUser = $_SESSION['user'];

        $query = "UPDATE users SET username = ? WHERE user = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ss", $newUsername, $loggedInUser);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);

        $query1 = "UPDATE users SET user = ? WHERE username = ?";
        $stmt1 = mysqli_prepare($conn, $query1);
        mysqli_stmt_bind_param($stmt1, "ss", $newUser, $loggedInUsername);
        mysqli_stmt_execute($stmt1);
        mysqli_stmt_close($stmt1);

        $_SESSION['user'] = $newUser;
        header("location:/vaayu/home.php/");
        exit();
    }
}
$username = $_SESSION['user'];
$query1 = "SELECT username FROM users WHERE user = ?;";
$stmt = mysqli_prepare($conn, $query1);
mysqli_stmt_bind_param($stmt, "s", $username);
mysqli_stmt_execute($stmt);
mysqli_stmt_bind_result($stmt, $username);
mysqli_stmt_fetch($stmt);
mysqli_stmt_close($stmt);
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
            </div>
        </nav>
        <div class="details">
            <h1>Dashboard</h1>
            <form class="form" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="POST"
                enctype="multipart/form-data">
                <div class="input-group">
                    <input type="name" name="updateUsername" autocomplete="off" class="input"
                        value="<?php echo $_SESSION['username']; ?>">
                    <label class="user-label">Username</label>
                </div>
                <div class="input-group">
                    <input required="true" type="email" name="updateUser" autocomplete="off" class="input"
                        value="<?php echo $_SESSION['user']; ?>">
                    <label class="user-label">Email</label>
                </div>
                <input class="form-button" type="submit" name="submit" value="Save Changes"><br>
                <a href="/vaayu/logout.php/">
                    <li class="sec-button">
                        <i class="fa fa-arrow-right-from-bracket icon"></i>
                        Logout
                    </li>
                </a>
            </form>
        </div>

        <footer>
            All Rights Reserved to <a href="/vaayu/home.php/"> Vaayu</a> 2023
        </footer>
    </div>
</body>

<style>
    <?php include "style/style.css" ?>
    <?php include "style/forms.css" ?>
</style>

</html>

<?php
mysqli_close($conn);

?>