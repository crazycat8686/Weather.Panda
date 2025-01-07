<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Account</title>
    <style>
        h1 {
            color: orange;
            font-family: lexend;
            font-weight: bolder;
            font-size: 50px;
        }
        input {
            border: 2px solid #111222;
            padding-left: 2px;
            margin-top: 5px;
        }
        form {
            margin: 5% auto;
            border: 3px solid black;
            padding: 20px;
            max-width: fit-content;
        }
        #submit-btn {
            display: flex;
            justify-content: center;
            padding: 10px;
            background-color: orange;
            color: white;
            border: none;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <form action="" method="post">
        <h1>Create Account</h1>
        City: <input type="text" name="city" required><br><br>
        Name: <input type="text" name="name" required><br><br>
        Password: <input type="password" name="password" required><br><br>
        <input id="submit-btn" type="submit" value="Create Account">
    </form>

    <?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $servername = "127.0.0.1";
        $username = "root";
        $password = "";
        $dbname = "db1fromclas";

        $city = $_POST["city"];
        $name = $_POST["name"];
        $userPassword = password_hash($_POST["password"], PASSWORD_DEFAULT);

        // Establish database connection
        $conn = mysqli_connect($servername, $username, $password, $dbname);

        // Check connection
        if (!$conn) {
            die("<h2>Connection failed: " . mysqli_connect_error() . "</h2>");
        }

        // Check if user already exists
        $checkQuery = "SELECT * FROM users WHERE name='$name'";
        $result = mysqli_query($conn, $checkQuery);

        if (!$result) {
            die("<h2>Error checking existing users: " . mysqli_error($conn) . "</h2>");
        }

        if (mysqli_num_rows($result) > 0) {
            echo "<h2 style='color:red;'>User already exists. Please try a different name.</h2>";
        } else {
            // Insert new user
            $insertQuery = "INSERT INTO users (city, name, password) VALUES ('$city', '$name', '$userPassword')";
            if (mysqli_query($conn, $insertQuery)) {
                echo "<h2 style='color:green;'>Account successfully created! 🎉</h2>";
            } else {
                echo "<h2 style='color:red;'>Account creation failed: " . mysqli_error($conn) . "</h2>";
            }
        }

        mysqli_close($conn);
    }
    ?>
</body>
</html>
