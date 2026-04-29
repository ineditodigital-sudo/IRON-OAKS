<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$password = "admin123"; // Default password, change this
$contentFile = 'content.json';
$uploadDir = '../uploads/';

if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (file_exists($contentFile)) {
        echo file_get_contents($contentFile);
    } else {
        echo json_encode(["error" => "Content file not found"]);
    }
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Login
    if (isset($input['action']) && $input['action'] === 'login') {
        if ($input['password'] === $password) {
            echo json_encode(["success" => true, "token" => md5($password . "salt")]);
        } else {
            http_response_code(401);
            echo json_encode(["error" => "Invalid password"]);
        }
        exit;
    }

    // Save Content (Requires Token)
    if (isset($input['action']) && $input['action'] === 'save') {
        if ($input['token'] === md5($password . "salt")) {
            file_put_contents($contentFile, json_encode($input['data'], JSON_PRETTY_PRINT));
            echo json_encode(["success" => true]);
        } else {
            http_response_code(403);
            echo json_encode(["error" => "Unauthorized"]);
        }
        exit;
    }

    // Upload Image (Multipart POST)
    if (isset($_POST['action']) && $_POST['action'] === 'upload') {
        if ($_POST['token'] === md5($password . "salt")) {
            if (isset($_FILES['file'])) {
                $file = $_FILES['file'];
                $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
                $filename = uniqid() . '.' . $ext;
                $target = $uploadDir . $filename;
                
                if (move_uploaded_file($file['tmp_name'], $target)) {
                    chmod($target, 0644); // Set readable permissions
                    // Return relative path to be handled by frontend helper
                    $url = 'api/uploads/' . $filename; 
                    echo json_encode(["success" => true, "url" => $url]);
                } else {
                    echo json_encode(["error" => "Upload failed"]);
                }
            }
        } else {
            http_response_code(403);
            echo json_encode(["error" => "Unauthorized"]);
        }
        exit;
    }
}
?>
