<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

include 'conexion.php';
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['correo']) && !empty($data['contraseña'])) {
  $correo = $data['correo'];
  $contraseña = $data['contraseña'];

  $stmt = $conn->prepare("SELECT * FROM usuarios WHERE correo = ?");
  $stmt->execute([$correo]);
  $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

  if ($usuario && password_verify($contraseña, $usuario['contraseña'])) {
    unset($usuario['contraseña']); 
    echo json_encode(["success" => true, "usuario" => $usuario]);
  } else {
    echo json_encode(["success" => false, "message" => "Credenciales inválidas"]);
  }
} else {
  echo json_encode(["success" => false, "message" => "Campos incompletos"]);
}
?>
