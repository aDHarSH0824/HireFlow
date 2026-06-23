<?php
include './includes/DbConnection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Create a database connection
$connection = new Database();
$db = $connection->getConnection();

$jobId = $_GET['id'] ?? null;

if ($jobId) {
    // Fetch a single job listing
    $query = "
        SELECT job_listings.id, job_listings.title, job_listings.company_name, job_listings.location, 
               job_listings.salary, job_listings.job_type, job_listings.description, job_listings.requirements,
               job_listings.employer_email
        FROM job_listings
        WHERE job_listings.id = :id
    ";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $jobId, PDO::PARAM_INT);
    
    try {
        $stmt->execute();
        $job = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($job) {
            echo json_encode(['status' => 1, 'job' => $job]);
        } else {
            echo json_encode(['status' => 0, 'message' => 'Job not found.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 0, 'message' => 'Error: ' . $e->getMessage()]);
    }
} else {
    // Fetch all jobs
    $query = "
        SELECT job_listings.id, job_listings.title, job_listings.company_name, job_listings.location, 
               job_listings.salary, job_listings.job_type, job_listings.description, job_listings.requirements,
               job_listings.employer_email
        FROM job_listings
    ";

    $stmt = $db->prepare($query);
    
    try {
        $stmt->execute();
        $jobs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($jobs);
    } catch (PDOException $e) {
        echo json_encode(['status' => 0, 'message' => 'Error: ' . $e->getMessage()]);
    }
}
?>
