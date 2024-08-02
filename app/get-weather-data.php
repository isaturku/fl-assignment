<?php
$error_msg = null;
$OWKEY = getenv("OWKEY");
$query = $_GET["query"];
$servername = getenv("DB_HOST");
$username = getenv("DB_USER");
$password = getenv("DB_PASS");
$database = getenv("DB_NAME");
$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$url = "https://api.openweathermap.org/data/2.5/weather?q={$query}&appid={$OWKEY}&units=metric";
$ch = curl_init();

curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

curl_setopt($ch, CURLOPT_URL, $url);

$result = curl_exec($ch);
$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

if ($http_status != 200) {
  http_response_code(404);
  echo "City not found";
  die();
}

$json = json_decode($result);

$stmt = $conn->prepare("INSERT INTO weather_data(city,temp,description,time) VALUES(?,?,?,?)");

$stmt->bind_param("sdsi", $city, $temp, $description, $time_added);

$city = $query;
$temp = $json->main->temp;
$description = $json->weather[0]->description;
$time_added = time();

$stmt->execute();

$conn->close();

echo $result;
