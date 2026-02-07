<!-- <?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'DbConnection.php';

$objDb = new Database();
$conn = $objDb->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "POST") {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['inputs']['name']) || !isset($data['inputs']['email']) || !isset($data['inputs']['password'])) {
        echo json_encode(['status' => 0, 'message' => 'Invalid input data']);
        exit;
    }

    $name = $data['inputs']['name'];
    $email = $data['inputs']['email'];
    $password = password_hash($data['inputs']['password'], PASSWORD_BCRYPT); // Hash the password for security

    $sql = "INSERT INTO users (name, email, password, created_at) VALUES (:name, :email, :password, :created_at)";
    $stmt = $conn->prepare($sql);

    $created_at = date('Y-m-d H:i:s');

    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);
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
?> -->
