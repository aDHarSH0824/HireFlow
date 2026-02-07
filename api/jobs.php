<?php
include './DbConnection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Create a database connection
$connection = new Database();
$db = $connection->getConnection();

// Fetch jobs and the job poster details
$query = "
    SELECT job_listings.id, job_listings.title, job_listings.company_name, job_listings.location, 
           job_listings.salary, job_listings.job_type, job_listings.description, job_listings.requirements,
           job_listings.employer_email
    FROM job_listings

";

$stmt = $db->prepare($query);
$stmt->execute();

$jobs = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Return the list of jobs as a JSON response
echo json_encode($jobs);
?>
