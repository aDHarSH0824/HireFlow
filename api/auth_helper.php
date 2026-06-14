<?php
class AuthHelper {
    private static $secret = "hireflow_super_secret_key_12345!";

    private static function base64UrlEncode($data) {
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
    }

    private static function base64UrlDecode($data) {
        $remainder = strlen($data) % 4;
        if ($remainder) {
            $data .= str_repeat('=', 4 - $remainder);
        }
        return base64_decode(str_replace(['-', '_'], ['+', '/'], $data));
    }

    public static function generateToken($payload) {
        $secret = getenv('JWT_SECRET') ?: self::$secret;
        $headers = json_encode(['alg' => 'HS256', 'typ' => 'JWT']);
        $headers_encoded = self::base64UrlEncode($headers);
        
        // Add expiration (24 hours)
        $payload['exp'] = time() + (24 * 60 * 60);
        $payload_encoded = self::base64UrlEncode(json_encode($payload));
        
        $signature = hash_hmac('SHA256', "$headers_encoded.$payload_encoded", $secret, true);
        $signature_encoded = self::base64UrlEncode($signature);
        
        return "$headers_encoded.$payload_encoded.$signature_encoded";
    }

    public static function verifyToken($token) {
        $secret = getenv('JWT_SECRET') ?: self::$secret;
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }
        
        list($headers_encoded, $payload_encoded, $signature_encoded) = $parts;
        
        $signature = hash_hmac('SHA256', "$headers_encoded.$payload_encoded", $secret, true);
        $expected_signature = self::base64UrlEncode($signature);
        
        if ($signature_encoded !== $expected_signature) {
            return null;
        }
        
        $payload = json_decode(self::base64UrlDecode($payload_encoded), true);
        if (isset($payload['exp']) && $payload['exp'] < time()) {
            return null; // Expired
        }
        
        return $payload;
    }

    public static function getBearerToken() {
        $headers = null;
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);
        } else if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
        } else if (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            $requestHeaders = array_change_key_case($requestHeaders, CASE_LOWER);
            if (isset($requestHeaders['authorization'])) {
                $headers = trim($requestHeaders['authorization']);
            }
        }
        
        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
        return null;
    }

    public static function authenticate() {
        // Handle OPTIONS request for CORS preflight
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Headers: Content-Type, Authorization");
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
            exit;
        }

        $token = self::getBearerToken();
        if (!$token) {
            header('HTTP/1.0 401 Unauthorized');
            header('Content-Type: application/json');
            echo json_encode(['status' => 0, 'message' => 'Access token required']);
            exit;
        }
        $payload = self::verifyToken($token);
        if (!$payload) {
            header('HTTP/1.0 401 Unauthorized');
            header('Content-Type: application/json');
            echo json_encode(['status' => 0, 'message' => 'Invalid or expired token']);
            exit;
        }
        return $payload;
    }
}
?>
