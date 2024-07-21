<?php
$query = $_GET["query"];
$json = file_get_contents("https://api.openweathermap.org/data/2.5/forecast?q={$query}&appid=f8ade6e21dca34d6292242d07204b3dd&units=metric");
header('Content-type: application/json');
echo $json;
