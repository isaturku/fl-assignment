<?php
$query = $_GET["query"];
$servername = getenv("DB_HOST");
$username = getenv("DB_USER");
$password = getenv("DB_PASS");
$database = getenv("DB_NAME");
$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("SELECT temp,description,time FROM weather_data WHERE city=?");
$stmt->bind_param("s", $city);
$city = $query;
$stmt->execute();
$res = $stmt->get_result();
$myArray = array();
while ($row = $res->fetch_assoc()) {
  $myArray[] = $row;
}
echo json_encode($myArray);
