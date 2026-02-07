<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include './DbConnection.php';

$objDb = new Database();
$conn = $objDb->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

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
