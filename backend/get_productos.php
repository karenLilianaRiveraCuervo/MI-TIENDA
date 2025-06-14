<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

include 'conexion.php';

try {
    $sql = "SELECT * FROM productos";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($productos);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
