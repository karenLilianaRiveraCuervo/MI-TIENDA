<?php
$host = "pymes.mysql.database.azure.com";
$dbname = "mi_tienda";
$username = "pymesadmin";
$password = "Karen1234"; 

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);

    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Conexión fallida: " . $e->getMessage());
}
?>

