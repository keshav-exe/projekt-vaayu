<?php
include("./database.php");

$err_dupe_pwd = "";
$err_dupe_user = "";
$err_emp_user = "";
$err_emp_pwd = "";
$err_mismatch = "";
$err_dne = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);

    if (empty($username)) {
        $err_emp_user = '<div class = "err">Username is Required!</div>';
    } else if (empty($password)) {
        $err_emp_pwd = '<div class = "err">Password is Required!</div>';
    } else {
        $password = md5($password);
        $query = "SELECT * FROM users WHERE user=
                '$username' AND pwd='$password'";
        $results = mysqli_query($conn, $query);
        try {
            if (mysqli_num_rows($results) == 1) {
                session_start();
                $_SESSION['auth'] = 'true';
                $_SESSION['success'] = "You have logged in!";
                $_SESSION['username'] = $username;
                header('location: /website/account.php');
                exit();
            }
        } catch (mysqli_sql_exception $e) {
            if ($e->getCode() == 1054) {
                $err_dne = '<div class = "err">User Doesn Not Exist</div>';
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
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://kit.fontawesome.com/054483bc4b.js" crossorigin="anonymous"></script>
</head>

<body>
    <div class="card">
        <a href="/website/home.php/" class="card-logo">vaayu</a>
        <form class="form" action="<?php htmlspecialchars($_SERVER["PHP_SELF"]) ?>" method="post">
            <!-- <label for="username"><img src="./bin/user.png" alt="username" width="16px"></label> -->
            <i class="fa-solid fa-user icon"></i>
            <input type="text" name="username" class="user" value placeholder="username"><br>
            <!-- <label for="password"><img src="./bin/password.png" alt="username" width="16px"></label> -->
            <i class="fa-solid fa-key icon"></i>
            <input type="password" name="password" class="pwd" value placeholder="password"><br>
            <input class="button" type="submit" name="submit" value="Log in"><br>
            <div class="link" id="reg">
                <a href="/website/register.php">Register New Account</a>
            </div>

        </form>
        <?php echo $err_dupe_pwd;
        echo $err_dupe_user;
        echo $err_emp_user;
        echo $err_emp_pwd;
        echo $err_mismatch
        ?>
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
?>