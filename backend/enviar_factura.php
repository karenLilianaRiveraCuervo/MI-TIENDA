<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

require 'src/PHPMailer.php';
require 'src/SMTP.php';
require 'src/Exception.php';
require 'dompdf/autoload.inc.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dompdf\Dompdf;

include 'conexion.php';

$data = json_decode(file_get_contents("php://input"), true);

if (
  !empty($data['nombre']) &&
  !empty($data['correo']) &&
  !empty($data['direccion']) &&
  !empty($data['metodoPago']) &&
  !is_null($data['total']) &&
  !empty($data['productos'])
) {
  try {
    $conn->beginTransaction();

    // Buscar el ID del usuario
    $stmtUsuario = $conn->prepare("SELECT id FROM usuarios WHERE correo = ?");
    $stmtUsuario->execute([$data['correo']]);
    $usuario = $stmtUsuario->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
      throw new Exception("Usuario no encontrado.");
    }

    $usuarioId = $usuario['id'];

    // Insertar en la tabla compras
    $stmt = $conn->prepare("INSERT INTO compras (usuario_id, correo, direccion, total, metodo_pago, fecha_compra) 
                            VALUES (?, ?, ?, ?, ?, NOW())");
    $stmt->execute([
      $usuarioId,
      $data['correo'],
      $data['direccion'],
      $data['total'],
      $data['metodoPago']
    ]);

    $idCompra = $conn->lastInsertId();

    // Insertar detalle de la compra
    foreach ($data['productos'] as $producto) {
      $stmt = $conn->prepare("INSERT INTO detalle_compra 
        (compra_id, producto_id, nombre_producto, cantidad, talla, precio_unitario, subtotal)
        VALUES (?, ?, ?, ?, ?, ?, ?)");
      $stmt->execute([
        $idCompra,
        $producto['id'],
        $producto['nombre'],
        $producto['cantidad'],
        $producto['talla'],
        $producto['precio'],
        $producto['precio'] * $producto['cantidad']
      ]);
    }

    $conn->commit();

    // ✅ 1. Generar el PDF con Dompdf
    ob_start();
    ?>
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Factura</title>
      <style>
        body { font-family: sans-serif; font-size: 14px; }
        h1 { color: #1a8fe2; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        td, th { border: 1px solid #ccc; padding: 8px; }
      </style>
    </head>
    <body>
      <h1>¡GRACIAS POR TU COMPRA, <?= htmlspecialchars($data['nombre']) ?>!</h1>
      <p><strong>Dirección:</strong> <?= htmlspecialchars($data['direccion']) ?></p>
      <p><strong>Método de pago:</strong> <?= htmlspecialchars($data['metodoPago']) ?></p>

      <table>
        <thead>
          <tr><th>Producto</th><th>Cant.</th><th>Talla</th><th>Subtotal</th></tr>
        </thead>
        <tbody>
          <?php foreach ($data['productos'] as $prod): ?>
            <tr>
              <td><?= htmlspecialchars($prod['nombre']) ?></td>
              <td><?= $prod['cantidad'] ?></td>
              <td><?= htmlspecialchars($prod['talla']) ?></td>
              <td>$<?= number_format($prod['precio'] * $prod['cantidad'], 2) ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>

      <h2>Total: $<?= number_format($data['total'], 2) ?></h2>
    </body>
    </html>
    <?php
    $html = ob_get_clean();

    $dompdf = new Dompdf();
    $dompdf->loadHtml($html);
    $dompdf->setPaper('A4', 'portrait');
    $dompdf->render();
    $pdfString = $dompdf->output();

    // ✅ 2. Enviar correo con PHPMailer
    $mail = new PHPMailer(true);

    try {
      $mail->isSMTP();
      $mail->Host = 'smtp.gmail.com';
      $mail->SMTPAuth = true;
      $mail->Username = 'TU_CORREO@gmail.com';        // <-- cámbialo por el tuyo
      $mail->Password = 'CONTRASEÑA_DE_APP';          // <-- usa contraseña de aplicación de Gmail
      $mail->SMTPSecure = 'tls';
      $mail->Port = 587;

      $mail->setFrom('TU_CORREO@gmail.com', 'Mi Tienda');
      $mail->addAddress($data['correo'], $data['nombre']);
      $mail->isHTML(true);
      $mail->Subject = '🧾 Factura de tu compra';

      $body = '<h2>Gracias por tu compra, ' . htmlspecialchars($data['nombre']) . '</h2>';
      $body .= '<p>Adjuntamos tu factura en PDF.</p>';
      $body .= '<p><strong>Total pagado:</strong> $' . number_format($data['total'], 2) . '</p>';
      $body .= '<br><p><em>Mi Tienda - ¡Gracias por preferirnos!</em></p>';

      $mail->Body = $body;
      $mail->addStringAttachment($pdfString, 'Factura.pdf');

      $mail->send();

      echo json_encode(["success" => true, "message" => "Compra registrada y factura enviada"]);
    } catch (Exception $e) {
      echo json_encode([
        "success" => true,
        "message" => "Compra registrada, pero no se pudo enviar el correo",
        "error" => $mail->ErrorInfo
      ]);
    }
  } catch (Exception $e) {
    $conn->rollBack();
    echo json_encode([
      "success" => false,
      "message" => "Error al registrar la compra",
      "error" => $e->getMessage()
    ]);
  }
} else {
  echo json_encode(["success" => false, "message" => "Datos incompletos"]);
}
