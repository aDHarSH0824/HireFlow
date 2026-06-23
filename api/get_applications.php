<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

include './includes/DbConnection.php';
include './includes/auth_helper.php';

// Authenticate request
$user = AuthHelper::authenticate();

$objDb = new Database();
$conn = $objDb->getConnection();

$posterEmail = $_GET['poster_email'] ?? '';

// Verify poster ownership
if ($user['role'] !== 'job_poster' || $user['email'] !== $posterEmail) {
    header('HTTP/1.0 403 Forbidden');
    echo json_encode(['status' => 0, 'message' => 'Unauthorized access to applications.']);
    exit;
}

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
