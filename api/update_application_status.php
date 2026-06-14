<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

include './DbConnection.php';
include './auth_helper.php';

// Authenticate request
$user = AuthHelper::authenticate();

if ($user['role'] !== 'job_poster') {
    header('HTTP/1.0 403 Forbidden');
    echo json_encode(['status' => 0, 'message' => 'Unauthorized access. Only job posters can update status.']);
    exit;
}

$objDb = new Database();
$conn = $objDb->getConnection();

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;
$status = $data['status'] ?? null;

if ($id && $status) {
    // Verify application ownership
    $checkSql = "SELECT poster_email FROM job_applications WHERE id = :id";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bindParam(':id', $id);
    $checkStmt->execute();
    $app = $checkStmt->fetch(PDO::FETCH_ASSOC);

    if (!$app || $app['poster_email'] !== $user['email']) {
        header('HTTP/1.0 403 Forbidden');
        echo json_encode(['status' => 0, 'message' => 'Unauthorized. You do not own this job listing application.']);
        exit;
    }

    $sql = "UPDATE job_applications SET status = :status WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':status', $status);
    $stmt->bindParam(':id', $id);
    
    try {
        $stmt->execute();
        echo json_encode(['status' => 1, 'message' => 'Application status updated successfully.']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 0, 'message' => 'Error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 0, 'message' => 'Invalid input.']);
}
?>
