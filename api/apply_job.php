<?php
include './DbConnection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Create a database connection
$connection = new Database();
$db = $connection->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect input data
    $userName = $_POST['userName'];
    $email = $_POST['email'];
    $employer_email=$_POST['employer_email'];
    $jobTitle = $_POST['jobTitle'];
    $companyName = $_POST['companyName'];
    // Check if a resume file was uploaded
    if (isset($_FILES['resume'])) {
        $resume = $_FILES['resume'];
        $resumeName = $resume['name'];
        $resumeTmpName = $resume['tmp_name'];
        $resumeSize = $resume['size'];
        $resumeError = $resume['error'];

        // Validate file upload
        if ($resumeError === 0) {
            $resumeExt = pathinfo($resumeName, PATHINFO_EXTENSION);
            $allowedExtensions = ['pdf', 'doc', 'docx'];

            if (in_array($resumeExt, $allowedExtensions)) {
                // Generate a unique name for the file
                $resumeNewName = uniqid('', true) . '.' . $resumeExt;
                $resumeDestination = './uploads/' . $resumeNewName;

                // Move the file to the uploads directory
                if (move_uploaded_file($resumeTmpName, $resumeDestination)) {
                    // Insert application data into the database
                    $query = "
                        INSERT INTO job_applications ( user_name, email, resume, poster_email,job_title,company_name)
                        VALUES (:user_name, :email, :resume, :poster_email,:job_title,:company_name)
                    ";

                    $stmt = $db->prepare($query);
                    $stmt->bindParam(':user_name', $userName);
                    $stmt->bindParam(':email', $email);
                    $stmt->bindParam(':resume', $resumeNewName);
                    $stmt->bindParam(':poster_email',$employer_email);
                    $stmt->bindParam(':job_title', $jobTitle);
                    $stmt->bindParam(':company_name', $companyName);

                    if ($stmt->execute()) {
                        echo json_encode(['status' => 1, 'message' => 'Application submitted successfully!']);
                    } else {
                        echo json_encode(['status' => 0, 'message' => 'Failed to save application.']);
                    }
                } else {
                    echo json_encode(['status' => 0, 'message' => 'Failed to upload resume.']);
                }
            } else {
                echo json_encode(['status' => 0, 'message' => 'Invalid file type. Only PDF, DOC, and DOCX files are allowed.']);
            }
        } else {
            echo json_encode(['status' => 0, 'message' => 'Error uploading file.']);
        }
    } else {
        echo json_encode(['status' => 0, 'message' => 'No resume uploaded.']);
    }
}
?>
