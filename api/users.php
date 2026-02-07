
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
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['password']) || !isset($data['role'])) {
        echo json_encode(['status' => 0, 'message' => 'Invalid input data']);
        exit;
    }

    $name = $data['name'];
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_BCRYPT); // Securely hash the password
    $role = $data['role'];

    // Validate the role
    if (!in_array($role, ['job_seeker', 'job_poster'])) {
        echo json_encode(['status' => 0, 'message' => 'Invalid role specified']);
        exit;
    }

    $sql = "INSERT INTO users (name, email, password, role, created_at) VALUES (:name, :email, :password, :role, :created_at)";
    $stmt = $conn->prepare($sql);

    $created_at = date('Y-m-d H:i:s');

    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);
    $stmt->bindParam(':role', $role);
    $stmt->bindParam(':created_at', $created_at);

    try {
        if ($stmt->execute()) {
            echo json_encode(['status' => 1, 'message' => 'User registered successfully']);
        } else {
            echo json_encode(['status' => 0, 'message' => 'Failed to register user']);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 0, 'message' => 'Error: ' . $e->getMessage()]);
    }
}
?>
