<?php
include("./database.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);
    $password = md5($password);

    // Implementing Password Policy (Example: At least 8 characters)
    if (strlen($_POST['password']) < 8) {
        echo "Password must contain at least 8 characters.";
    } else {
        $query = "SELECT * FROM users WHERE user = '$username' AND pwd='$password'";
        $results = mysqli_query($conn, $query);
        try {
            if (mysqli_num_rows($results) > 0) {
                // Login successful
                session_start();
                $rows = mysqli_fetch_assoc($results);
                $_SESSION['auth'] = 'true';
                $_SESSION['user'] = $username;
                while ($row = mysqli_fetch_array($results)) {
                    $_SESSION['username'] = $row['username'];
                    $_SESSION['uid'] = $row['uid'];
                }
                header('location:/vaayu/home.php');
                exit();
            }
        } catch (mysqli_sql_exception $e) {
            if ($e->getCode() == 1054) {
                $err_dne = '<div class = "err">User Does Not Exist</div>';
            } else {
                echo $e;
            }
        }
    }
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | Vaayu</title>
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
    <div class="container-img-l"></div>
    <div class="container-img-r"></div>
    <div class="container">
        <div class="form-card">
            <a href="/vaayu/home.php/" class="form-logo">vaayu</a>
            <form class="form" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]) ?>" method="post">
                <div class="input-group">
                    <input required="" type="email" name="username" autocomplete="off" class="input">
                    <label class="user-label">Email</label>
                </div>
                <div class="input-group">
                    <input required="" type="password" name="password" autocomplete="off" class="input">
                    <label class="user-label">Password</label>
                </div>
                <input class="form-button" type="submit" name="submit" value="Login">
                <a href="/vaayu/register.php/">
                    <li class="sec-button">Register</li>
                </a>
            </form>
        </div>
    </div>

    <script src="./script.js"></script>
    <footer>
        All Rights Reserved to <a href="/vaayu/home.php/">Vaayu</a> 2023
    </footer>
</body>

<style>
    <?php include "style/style.css" ?>
    <?php include "style/forms.css" ?>
</style>

</html>

<?php
mysqli_close($conn);
?>