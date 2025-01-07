

<?php
// Connecting to the Database
$servername = "localhost";
$username = "root";
$password = "";
$database = "db1fromclas";


$conn = mysqli_connect($servername, $username, $password, $database);



if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $reg = $_POST['reg'];

    $str = "SELECT name FROM w where Reg No = '$reg'";

    $result = mysqli_query($conn, $str);

    // Find the number of records returned
    $num = mysqli_num_rows($result);

    // echo $num;
// echo " records found in my table<br>";
// Display the rows returned by the sql query
    if ($num > 0) {

        // We can fetch in a better way using the while loop
        while ($r = mysqli_fetch_assoc($result)) {
            // echo var_dump($row);
            echo "<b>Name:</b>" . $r['name'] . "<br><b>cgpa :</b> ";

        }


    } else
        echo " No Record found in the table.<br>";

}
?>
<html>
<body>
    <form action="" method="post">
        <h1>Student registrationbvcvbnm</h1>
        <br>
    
        reg: <input type="text" name="reg" required>
        <br>
        <br>
      


        <input id="sub" type="submit">
    </form>
</body>
</html>
