<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON data from request body
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if ($data) {
        $to = "ineditodigital@gmail.com";
        $subject = "New Solar Consultation Request - " . $data['name'];
        
        $name = $data['name'];
        $email = $data['email'];
        $phone = $data['phone'] ? $data['phone'] : 'Not provided';
        $bill = $data['bill'];
        $cost = $data['cost'];
        $annual = $data['annual'];
        $lifetime = $data['lifetime'];

        $message = "
        <html>
        <head>
        <title>New Solar Consultation Request</title>
        </head>
        <body>
        <h2>Customer Details</h2>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Phone:</strong> {$phone}</p>
        <hr>
        <h2>Calculation Results</h2>
        <p><strong>Monthly Bill:</strong> \${$bill}</p>
        <p><strong>Estimated System Cost:</strong> {$cost}</p>
        <p><strong>Annual Savings:</strong> {$annual}</p>
        <p><strong>Lifetime Savings (30 years):</strong> {$lifetime}</p>
        <br>
        <p>This message was sent from the IronOak Power Calculator.</p>
        </body>
        </html>
        ";

        // Headers for HTML email
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: IronOak Website <noreply@ironoakpower.com>" . "\r\n";

        if (mail($to, $subject, $message, $headers)) {
            echo json_encode(["status" => "success", "message" => "Email sent successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to send email"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid data"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}
?>
