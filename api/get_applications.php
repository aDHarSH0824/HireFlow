<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include './DbConnection.php';

$objDb = new Database();
$conn = $objDb->getConnection();

$posterEmail = $_GET['poster_email'] ?? '';

if ($posterEmail) {
    $sql = "SELECT * FROM job_applications WHERE poster_email = :posterEmail";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':posterEmail', $posterEmail);
    
    try {
        $stmt->execute();
        $applications = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        if ($applications) {
            echo json_encode(['status' => 1, 'applications' => $applications]);
        } else {
            echo json_encode(['status' => 0, 'message' => 'No applications found.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 0, 'message' => 'Error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 0, 'message' => 'Invalid poster email.']);
}
?>
