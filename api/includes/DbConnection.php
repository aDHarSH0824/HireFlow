<?php
class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;

    public function __construct() {
        // Detect local host name
        $httpHost = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : '';
        $isLocal = ($httpHost === 'localhost' || $httpHost === '127.0.0.1' || preg_match('/^(localhost|127\.0\.0\.1):/', $httpHost));

        if ($isLocal) {
            $this->host = getenv('DB_HOST') ?: "localhost";
            $this->db_name = getenv('DB_NAME') ?: "hireway";
            $this->username = getenv('DB_USER') ?: "root";
            $this->password = getenv('DB_PASSWORD') !== false ? getenv('DB_PASSWORD') : "";
        } else {
            // Strictly fetch credentials from environment variables in production
            $this->host = getenv('DB_HOST');
            $this->db_name = getenv('DB_NAME');
            $this->username = getenv('DB_USER');
            $this->password = getenv('DB_PASSWORD') !== false ? getenv('DB_PASSWORD') : null;
        }
    }

    public function getConnection() {
        $this->conn = null;
        if (empty($this->host) || empty($this->db_name) || empty($this->username)) {
            echo "Database configuration error: Missing environment variables.";
            return null;
        }
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
            return $this->conn;
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
    }
}
?>
