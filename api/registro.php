<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

include 'conexion.php';
header("Content-Type: application/json");




$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['nombre']) && !empty($data['correo']) && !empty($data['contraseña']) && !empty($data['direccion'])) {
  $nombre = $data['nombre'];
  $correo = $data['correo'];
  $direccion = $data['direccion'];
  $contrasena = password_hash($data['contraseña'], PASSWORD_DEFAULT);
  
  $rol = 'cliente'; // por defecto

  $stmt = $conn->prepare("INSERT INTO usuarios (nombre, correo, direccion, contraseña, rol) VALUES (?, ?, ?, ?, ?)");
  if ($stmt->execute([$nombre, $correo, $direccion, $contrasena, $rol])) {
    echo json_encode(["success" => true, "message" => "Registro exitoso"]);
  } else {
    echo json_encode(["success" => false, "message" => "Error al registrar"]);
  }
} else {
  echo json_encode(["success" => false, "message" => "Campos incompletos"]);
}
?>
