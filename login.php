<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $servername = "127.0.0.1";
    $username = "root";
    $password = "";
    $dbname = "db1fromclas";

    $name = $_POST["name"];
    $userPassword = $_POST["password"];
    $check = 0;

    // Establish database connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);

    if (!$conn) {
        die("<h2>Connection failed: " . mysqli_connect_error() . "</h2>");
    }

    // Use prepared statements to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM users WHERE name = ?");
    $stmt->bind_param("s", $name); // "s" means the parameter is a string
    $stmt->execute();
    $result = $stmt->get_result();

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);

        // Verify password
        if (password_verify($userPassword, $row['password'])) {
            // Fetch the city from the database
            $city = $row['city'];

            // Display login success message
            echo "<h2 style='color:green;'>Login successful! 🎉</h2>";

            // Store the name and city in JavaScript localStorage
            echo "<script>
                    localStorage.setItem('name', " . json_encode($name) . ");
                    localStorage.setItem('searchLocation', " . json_encode($city) . ");
                  </script>";
                  
        

        } else {
            echo "<h2>Invalid password. Please try again.</h2>";
        }
    } else {
        echo "<h2>No account found with that name. Please check your username or create an account.</h2>";
    }

    mysqli_close($conn);
} else {
    echo "<h2>Please submit the form.</h2>";
}
?>
