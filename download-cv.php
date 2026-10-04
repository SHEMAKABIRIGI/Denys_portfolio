<?php

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    http_response_code(405);
    exit('This endpoint only accepts GET requests.');
}

$cvPath = __DIR__ . '/assets/denys-cv.pdf';

if (!is_file($cvPath)) {
    http_response_code(404);
    exit('The CV file could not be found.');
}

if (!is_readable($cvPath)) {
    error_log('Portfolio CV download error: CV file is not readable.');
    http_response_code(500);
    exit('The CV file is unavailable right now.');
}

header('Content-Type: application/pdf');
header('Content-Disposition: attachment; filename="Denys-CV.pdf"');
header('Content-Length: ' . filesize($cvPath));
header('Cache-Control: private, no-store');
header('X-Content-Type-Options: nosniff');

readfile($cvPath);
exit;
