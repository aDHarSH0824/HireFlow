<?php
class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;

    public function __construct() {
        // Reads from environment variables if defined, otherwise falls back to InfinityFree credentials
        $this->host = getenv('DB_HOST') ?: "sql111.infinityfree.com";
        $this->db_name = getenv('DB_NAME') ?: "if0_42174750_hireFlow";
        $this->username = getenv('DB_USER') ?: "if0_42174750";
        $this->password = getenv('DB_PASSWORD') !== false ? getenv('DB_PASSWORD') : "Webscope123";
    }

    public function getConnection() {
        $this->conn = null;
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
