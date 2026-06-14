<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

include './DbConnection.php';
include './auth_helper.php';

// Authenticate request
$user = AuthHelper::authenticate();

if ($user['role'] !== 'job_seeker') {
    header('HTTP/1.0 403 Forbidden');
    echo json_encode(['status' => 0, 'message' => 'Unauthorized. Only job seekers can view their applications.']);
    exit;
}

$objDb = new Database();
$conn = $objDb->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get the email from the query parameter
    $userEmail = isset($_GET['user_email']) ? $_GET['user_email'] : '';

    // Verify authorized user context
    if ($user['email'] !== $userEmail) {
        header('HTTP/1.0 403 Forbidden');
        echo json_encode(['status' => 0, 'message' => 'Unauthorized user context.']);
        exit;
    }

    if (empty($userEmail)) {
        echo json_encode(['status' => 0, 'message' => 'User email is required']);
        exit;
    }

    // Query to fetch applications for the specific user email
    $query = "SELECT id, user_name, email, resume, application_date, poster_id, poster_email, status, job_title, company_name 
              FROM job_applications 
              WHERE email = :userEmail";  // Fetch only the applications of the user

    $stmt = $conn->prepare($query);
    $stmt->bindParam(':userEmail', $userEmail, PDO::PARAM_STR);

    try {
        $stmt->execute();
        $applications = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (count($applications) > 0) {
            echo json_encode(['status' => 1, 'applications' => $applications]);
        } else {
            echo json_encode(['status' => 0, 'message' => 'No applications found for this user']);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 0, 'message' => 'Error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
}
?>
