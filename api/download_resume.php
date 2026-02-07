<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include './DbConnection.php';

// Create a database connection
$connection = new Database();
$db = $connection->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get application ID and poster email from the query parameters
    $applicationId = $_GET['application_id'] ?? '';
    $posterEmail = $_GET['poster_email'] ?? '';

    if ($applicationId && $posterEmail) {
        // Fetch application details for the given application ID and poster email
        $query = "SELECT resume FROM job_applications WHERE id = :applicationId AND poster_email = :posterEmail";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':applicationId', $applicationId);
        $stmt->bindParam(':posterEmail', $posterEmail);

        try {
            $stmt->execute();
            $application = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($application) {
                $resumePath = './uploads/' . $application['resume'];

                // Check if the resume file exists
                if (file_exists($resumePath)) {
                    // Serve the file for download
                    header('Content-Type: application/octet-stream');
                    header('Content-Disposition: attachment; filename="' . basename($resumePath) . '"');
                    readfile($resumePath);
                    exit;
                } else {
                    echo json_encode(['status' => 0, 'message' => 'Resume file not found.']);
                }
            } else {
                echo json_encode(['status' => 0, 'message' => 'No application found for the given ID and poster email.']);
            }
        } catch (PDOException $e) {
            echo json_encode(['status' => 0, 'message' => 'Error: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['status' => 0, 'message' => 'Invalid parameters.']);
    }
} else {
    echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
}
?>
