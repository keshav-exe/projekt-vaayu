<?php
include("./database.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
    $username = $_POST['username'];
    $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);
    $cnfPassword = filter_input(INPUT_POST, "cnfPassword", FILTER_SANITIZE_SPECIAL_CHARS);

    // Implementing Password Policy
    $uppercase = preg_match('@[A-Z]@', $password);
    $lowercase = preg_match('@[a-z]@', $password);
    $number = preg_match('@[0-9]@', $password);
    $specialChars = preg_match('@[^\w]@', $password);

    if (!$uppercase || !$lowercase || !$number || !$specialChars || strlen($password) < 8) {
        // Password does not meet the policy
        echo "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.";
    } else {
        $hash = md5($password);
        $sql = "INSERT INTO users(user, pwd) VALUES ('$username', '$hash')";
        if ($password == $cnfPassword) {
            try {
                mysqli_query($conn, $sql);
                header("location:/vaayu/login.php/");
                exit();
            } catch (mysqli_sql_exception $e) {
                if ($e->getCode() == 1062) {
                    $err_dupe_user = '<div class = "popup">Username is Already Registered!</div>';
                } else {
                    throw $e;
                }
            }
        } else {
            echo "Passwords Do Not Match!";
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
    <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://kit.fontawesome.com/054483bc4b.js" crossorigin="anonymous"></script>
    <script src="/vaayu/script.js"></script>
</head>

<body onload="document.body.style.opacity='1'">
    <div class="container">
        <div class="container-img-l"></div>
        <div class="container-img-r"></div>
        <div class="form-card">
            <a href="/vaayu/home.php/" class="form-logo">vaayu</a>
            <form class="form" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]) ?>" method="post">
                <div class="input-group">
                    <input required="true" type="email" name="username" autocomplete="off" class="input">
                    <label class="user-label">Enter Email</label>
                </div>
                <div class="input-group">
                    <input required="" type="password" name="password" autocomplete="off" class="input">
                    <label class="user-label">Create Password</label>
                </div>
                <div class="input-group">
                    <input required="" type="password" name="cnfPassword" autocomplete="off" class="input">
                    <label class="user-label">Confirm Password</label>
                </div>
                <input class="form-button" type="submit" name="submit" value="Register">
                <a href="/vaayu/login.php/">
                    <li class="sec-button">Login</li>
                </a>
            </form>
        </div>
        <footer>
            All Rights Reserved to <a href="/vaayu/home.php/">Vaayu</a> 2023
        </footer>
    </div>

    <script src="./script.js"></script>
</body>

<style>
    <?php include "style/style.css" ?>
    <?php include "style/style.css" ?>
    <?php include "style/forms.css" ?>
</style>

</html>

<?php
mysqli_close($conn);
?>