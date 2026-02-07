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
    if (empty($data['email']) || empty($data['password'])) {
        echo json_encode(['status' => 0, 'message' => 'Invalid input data']);
        exit;
    }

    $email = $data['email'];
    $password = $data['password'];

    $sql = "SELECT id, name, email, password, role FROM users WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $email);

    try {
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            if (password_verify($password, $user['password'])) {
                // Login successful
                echo json_encode([
                    'status' => 1,
                    'message' => 'Login successful',
                    'user' => [
                        'id' => $user['id'],
                        'name' => $user['name'],
                        'email' => $user['email'],
                        'role' => $user['role'], // Include user role
                    ]
                ]);
            } else {
                // Invalid password
                echo json_encode(['status' => 0, 'message' => 'Invalid email or password']);
            }
        } else {
            // User not found
            echo json_encode(['status' => 0, 'message' => 'Invalid email or password']);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 0, 'message' => 'Error: ' . $e->getMessage()]);
    }
}
?>
