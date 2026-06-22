<?php
include_once './DbConnection.php';

class RateLimiter {
    public static function check($endpoint, $limit = 60, $window = 60) {
        $ip = self::getIPAddress();
        
        $objDb = new Database();
        $conn = $objDb->getConnection();
        
        if (!$conn) {
            return; // Ignore rate limiting if database connection fails (fail-open)
        }
        
        // Ensure the rate_limits table exists in the database
        self::ensureTableExists($conn);
        
        $now = time();
        
        // Fetch current rate limit info for this IP and endpoint
        $sql = "SELECT request_count, first_request FROM rate_limits WHERE ip_address = :ip AND endpoint = :endpoint";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':ip', $ip);
        $stmt->bindParam(':endpoint', $endpoint);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($row) {
            $firstRequest = strtotime($row['first_request']);
            $count = (int)$row['request_count'];
            
            if (($now - $firstRequest) > $window) {
                // Window has expired, reset count and set first_request to current time
                $updateSql = "UPDATE rate_limits SET request_count = 1, first_request = CURRENT_TIMESTAMP WHERE ip_address = :ip AND endpoint = :endpoint";
                $updateStmt = $conn->prepare($updateSql);
                $updateStmt->bindParam(':ip', $ip);
                $updateStmt->bindParam(':endpoint', $endpoint);
                $updateStmt->execute();
            } else {
                if ($count >= $limit) {
                    // Request limit exceeded, block request and return 429 status
                    header('HTTP/1.1 429 Too Many Requests');
                    header('Content-Type: application/json');
                    echo json_encode([
                        'status' => 0,
                        'message' => 'Too many requests. Please try again later.'
                    ]);
                    exit;
                } else {
                    // Increment the request count
                    $updateSql = "UPDATE rate_limits SET request_count = request_count + 1 WHERE ip_address = :ip AND endpoint = :endpoint";
                    $updateStmt = $conn->prepare($updateSql);
                    $updateStmt->bindParam(':ip', $ip);
                    $updateStmt->bindParam(':endpoint', $endpoint);
                    $updateStmt->execute();
                }
            }
        } else {
            // First request from this IP in the window
            $insertSql = "INSERT INTO rate_limits (ip_address, endpoint, request_count, first_request) VALUES (:ip, :endpoint, 1, CURRENT_TIMESTAMP)";
            $insertStmt = $conn->prepare($insertSql);
            $insertStmt->bindParam(':ip', $ip);
            $insertStmt->bindParam(':endpoint', $endpoint);
            $insertStmt->execute();
        }
    }
    
    private static function getIPAddress() {
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            // Extract the first IP in the list in case of proxies (like Cloudflare or Render)
            $ipList = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $ip = trim($ipList[0]);
        } else {
            $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
        }
        return $ip;
    }
    
    private static function ensureTableExists($conn) {
        $sql = "CREATE TABLE IF NOT EXISTS `rate_limits` (
            `ip_address` VARCHAR(45) NOT NULL,
            `endpoint` VARCHAR(100) NOT NULL,
            `request_count` INT NOT NULL DEFAULT 1,
            `first_request` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `last_request` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (`ip_address`, `endpoint`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
        $conn->exec($sql);
    }
}
?>
