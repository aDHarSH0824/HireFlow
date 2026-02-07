<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include './DbConnection.php';

$objDb = new Database();
$conn = $objDb->getConnection();

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? null;
$status = $data['status'] ?? null;

if ($id && $status) {
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
