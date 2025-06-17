<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

include 'conexion.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case 'GET':
    $stmt = $conn->query("SELECT * FROM productos");
    $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($productos);
    break;

  case 'POST':
    $data = json_decode(file_get_contents("php://input"), true);
    if (
      isset($data['nombre']) &&
      isset($data['precio']) &&
      isset($data['categoria']) &&
      isset($data['imagen']) &&
      isset($data['stock'])
    ) {
      $stmt = $conn->prepare("INSERT INTO productos (nombre, precio, categoria, imagen, stock) VALUES (?, ?, ?, ?, ?)");
      $stmt->execute([
        $data['nombre'],
        $data['precio'],
        $data['categoria'],
        $data['imagen'],
        $data['stock']
      ]);
      echo json_encode(["success" => true, "message" => "Producto creado"]);
    } else {
      echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    }
    break;

  case 'PUT':
    parse_str(file_get_contents("php://input"), $_PUT);
    if (
      isset($_PUT['id']) &&
      isset($_PUT['nombre']) &&
      isset($_PUT['precio']) &&
      isset($_PUT['categoria']) &&
      isset($_PUT['imagen']) &&
      isset($_PUT['stock'])
    ) {
      $stmt = $conn->prepare("UPDATE productos SET nombre=?, precio=?, categoria=?, imagen=?, stock=? WHERE id=?");
      $stmt->execute([
        $_PUT['nombre'],
        $_PUT['precio'],
        $_PUT['categoria'],
        $_PUT['imagen'],
        $_PUT['stock'],
        $_PUT['id']
      ]);
      echo json_encode(["success" => true, "message" => "Producto actualizado"]);
    } else {
      echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    }
    break;

  case 'DELETE':
    parse_str(file_get_contents("php://input"), $_DELETE);
    if (isset($_DELETE['id'])) {
      $stmt = $conn->prepare("DELETE FROM productos WHERE id = ?");
      $stmt->execute([$_DELETE['id']]);
      echo json_encode(["success" => true, "message" => "Producto eliminado"]);
    } else {
      echo json_encode(["success" => false, "message" => "ID no proporcionado"]);
    }
    break;

  default:
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
    break;
}
?>
