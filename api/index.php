<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

echo json_encode([
    "status" => 1,
    "service" => "HireFlow API Service",
    "version" => "1.0.0"
]);
?>
