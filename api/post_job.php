<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

include './DbConnection.php';
include './rate_limit_helper.php';
include './auth_helper.php';

// Apply rate limit: max 5 requests per 60 seconds
RateLimiter::check('post_job', 5, 60);

// Authenticate request
$user = AuthHelper::authenticate();

if ($user['role'] !== 'job_poster') {
    header('HTTP/1.0 403 Forbidden');
    echo json_encode(['status' => 0, 'message' => 'Unauthorized. Only job posters can post jobs.']);
    exit;
}

$objDb = new Database();
$conn = $objDb->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Verify authorized user context
    if ($user['email'] !== ($data['poster_email'] ?? '')) {
        header('HTTP/1.0 403 Forbidden');
        echo json_encode(['status' => 0, 'message' => 'Unauthorized poster context.']);
        exit;
    }

    // Validate inputs
    if (
        empty($data['jobTitle']) || empty($data['companyName']) ||
        empty($data['location']) || empty($data['salary']) ||
        empty($data['jobType']) || empty($data['description']) ||
        empty($data['requirements'])
    ) {
        echo json_encode(['status' => 0, 'message' => 'All fields are required']);
        exit;
    }

    $jobTitle = $data['jobTitle'];
    $companyName = $data['companyName'];
    $location = $data['location'];
    $salary = $data['salary'];
    $jobType = $data['jobType'];
    $description = $data['description'];
    $requirements = $data['requirements'];
    $useremail=$data['poster_email'];
    $sql = "INSERT INTO job_listings (title, company_name, location, salary, job_type, description, requirements,employer_email) 
            VALUES (:jobTitle, :companyName, :location, :salary, :jobType, :description, :requirements,:useremail)";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':jobTitle', $jobTitle);
    $stmt->bindParam(':companyName', $companyName);
    $stmt->bindParam(':location', $location);
    $stmt->bindParam(':salary', $salary);
    $stmt->bindParam(':jobType', $jobType);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':requirements', $requirements);
    $stmt->bindParam(':useremail', $useremail);

    try {
        $stmt->execute();
        echo json_encode(['status' => 1, 'message' => 'Job posted successfully']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 0, 'message' => 'Error: ' . $e->getMessage()]);
    }
}
?>
