<?php

use PHPMailer\PHPMailer\Exception as MailException;
use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');

function respond($status, $message)
{
    http_response_code($status);
    echo json_encode(['message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, 'This endpoint only accepts contact form submissions.');
}

$contentType = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';
$payload = stripos($contentType, 'application/json') !== false
    ? json_decode(file_get_contents('php://input'), true)
    : $_POST;

if (!is_array($payload)) {
    respond(400, 'Please submit the form again.');
}

$name = isset($payload['name']) && is_string($payload['name']) ? trim($payload['name']) : '';
$email = isset($payload['email']) && is_string($payload['email']) ? trim($payload['email']) : '';
$subject = isset($payload['subject']) && is_string($payload['subject']) ? trim($payload['subject']) : '';
$message = isset($payload['message']) && is_string($payload['message']) ? trim($payload['message']) : '';

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    respond(422, 'Please complete all fields before sending your message.');
}

if (strlen($name) > 120 || strlen($email) > 254 || strlen($subject) > 200 || strlen($message) > 10000) {
    respond(422, 'One or more fields are too long. Please shorten your message and try again.');
}

if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    respond(422, 'Please enter a valid email address.');
}

$smtpUsername = getenv('CONTACT_SMTP_USERNAME');
 $smtpPassword = getenv('CONTACT_SMTP_PASSWORD');

if (!is_string($smtpUsername) || trim($smtpUsername) === ''
    || !is_string($smtpPassword) || trim($smtpPassword) === '') {
    respond(500, 'Email sending is not configured on the server yet. Please email me directly.');
}

if (filter_var(trim($smtpUsername), FILTER_VALIDATE_EMAIL) === false) {
    respond(500, 'The contact email configuration is invalid. Please email me directly.');
}

require __DIR__ . '/vendor/autoload.php';

$mailer = new PHPMailer(true);

try {
    $mailer->isSMTP();
    $mailer->Host = 'smtp.gmail.com';
    $mailer->SMTPAuth = true;
    $mailer->Username = trim($smtpUsername);
    $mailer->Password = $smtpPassword;
    $mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mailer->Port = 587;
    $mailer->Timeout = 15;
    $mailer->CharSet = PHPMailer::CHARSET_UTF8;
    $mailer->setFrom(trim($smtpUsername), 'Portfolio Contact');
    $mailer->addAddress('shemakabirigid@gmail.com');
    $mailer->addReplyTo($email, $name);
    $mailer->Subject = 'Portfolio contact: ' . $subject;
    $mailer->Body = "Name: {$name}\n"
        . "Email: {$email}\n"
        . "Subject: {$subject}\n\n"
        . "Message:\n{$message}\n";
    $mailer->send();
} catch (MailException $error) {
    error_log('Portfolio contact email error: ' . $mailer->ErrorInfo);
    respond(500, 'Your message could not be sent right now. Please try again later or email me directly.');
}

respond(200, 'Your message has been sent successfully. Thank you for getting in touch!');
