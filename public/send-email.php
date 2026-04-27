<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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
        $date = date("F j, Y, g:i a");

        $message = "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a2b3c; margin: 0; padding: 0; background-color: #f4f7f9; }
                .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e1e8ed; }
                .header { background-color: #ffffff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #f0f0f0; }
                .logo { max-width: 180px; height: auto; }
                .content { padding: 40px; }
                .title { font-size: 22px; font-weight: bold; color: #1a2b3c; margin-bottom: 30px; text-align: center; text-transform: uppercase; letter-spacing: 1px; }
                .info-section { margin-bottom: 30px; }
                .info-row { margin-bottom: 15px; font-size: 14px; display: flex; }
                .info-label { font-weight: bold; color: #89ae83; width: 140px; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; }
                .info-value { color: #1a2b3c; font-size: 15px; }
                .results-box { background-color: #f8fafc; border-radius: 8px; padding: 25px; border-left: 4px solid #89ae83; margin-top: 20px; }
                .results-title { font-size: 12px; font-weight: bold; color: #89ae83; text-transform: uppercase; margin-bottom: 15px; letter-spacing: 1px; }
                .footer { background-color: #ffffff; padding: 30px 20px; text-align: center; border-top: 1px solid #f0f0f0; }
                .footer-logo { max-width: 100px; opacity: 0.5; margin-bottom: 15px; }
                .copyright { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
                .date { font-size: 10px; color: #cbd5e1; margin-top: 5px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <img src='https://imagenes.inedito.digital/IRONOAK%20POWER/LOGO-IRONOAK-AZUL.svg' alt='IronOak Power' class='logo'>
                </div>
                <div class='content'>
                    <div class='title'>New Service Inquiry</div>
                    
                    <div class='info-section'>
                        <div class='info-row'>
                            <span class='info-label'>Customer Name:</span>
                            <span class='info-value'>{$name}</span>
                        </div>
                        <div class='info-row'>
                            <span class='info-label'>Email Address:</span>
                            <span class='info-value'><a href='mailto:{$email}' style='color: #89ae83; text-decoration: none;'>{$email}</a></span>
                        </div>
                        <div class='info-row'>
                            <span class='info-label'>Phone Number:</span>
                            <span class='info-value'>{$phone}</span>
                        </div>
                    </div>

                    <div class='results-box'>
                        <div class='results-title'>Calculation Summary</div>
                        <div class='info-row'>
                            <span class='info-label'>Monthly Bill:</span>
                            <span class='info-value'>\${$bill}</span>
                        </div>
                        <div class='info-row'>
                            <span class='info-label'>System Cost:</span>
                            <span class='info-value'>{$cost}</span>
                        </div>
                        <div class='info-row'>
                            <span class='info-label'>Annual Savings:</span>
                            <span class='info-value' style='color: #89ae83; font-weight: bold;'>{$annual}</span>
                        </div>
                        <div class='info-row'>
                            <span class='info-label'>30-Year Savings:</span>
                            <span class='info-value' style='color: #89ae83; font-weight: bold;'>{$lifetime}</span>
                        </div>
                    </div>
                </div>
                <div class='footer'>
                    <img src='https://imagenes.inedito.digital/IRONOAK%20POWER/LOGO-IRONOAK-AZUL.svg' alt='IronOak Power' class='footer-logo'>
                    <div class='copyright'>© " . date("Y") . " IronOak Power. All rights reserved.</div>
                    <div class='date'>Received on {$date}</div>
                </div>
            </div>
        </body>
        </html>
        ";

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
