<?php
include("./database.php");

$err_dupe_pwd = "";
$err_dupe_user = "";
$err_emp_user = "";
$err_emp_pwd = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);
    $cnfpassword = filter_input(INPUT_POST, "cnfpassword", FILTER_SANITIZE_SPECIAL_CHARS);

    if (empty($username)) {
        $err_emp_user = '<div class = "err">Username is Required!</div>';
    } else if (empty($password)) {
        $err_emp_pwd = '<div class = "err">Password is Required!</div>';
    } else {
        $hash = md5($password);
        $sql = "insert into users(user, pwd) values ('$username', '$hash')";
        if ($password == $cnfpassword) {
            try {
                mysqli_query($conn, $sql);
                header("location:/website/login.php/");
                exit();
            } catch (mysqli_sql_exception $e) {
                if ($e->getCode() == 1062) {
                    $err_dupe_user = '<div class = "err">Username is Already Registered!</div>';
                } else {
                    throw $e;
                }
            }
        } else {
            $err_dupe_pwd = '<div class = "err">Passwords Dont Match!</div>';
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register | Vaayu</title>
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
            <input type="text" name="username" class="user" value placeholder="create username"><br>
            <!-- <label for="password"><img src="./bin/password.png" alt="username" width="16px"></label> -->
            <i class="fa-solid fa-key icon"></i>
            <input type="password" name="password" class="pwd" value placeholder="create password"><br>
            <!-- <i class="fa-solid fa-key icon"></i> -->
            <i class="fa-solid fa-check icon"></i>
            <input type="password" name="cnfpassword" class="pwd" value placeholder="confirm password"><br>

            <input class="button" type="submit" name="submit" value="Register"><br>
            <div class="link" id="reg">
                <a href="/website/login.php">Already Registered?</a>
            </div>

        </form>
        <?php echo $err_dupe_pwd;
        echo $err_dupe_user;
        echo $err_emp_user;
        echo $err_emp_pwd;
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