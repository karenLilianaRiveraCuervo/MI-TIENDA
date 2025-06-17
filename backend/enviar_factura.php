<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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
    !empty($data['productos']) &&
    !is_null($data['total'])
) {
    try {
        $conn->beginTransaction();

        
        $stmtUsuario = $conn->prepare("SELECT id FROM usuarios WHERE correo = ?");
        $stmtUsuario->execute([$data['correo']]);
        $usuario = $stmtUsuario->fetch(PDO::FETCH_ASSOC);

        if (!$usuario) {
            throw new Exception("Usuario no encontrado.");
        }

        $usuarioId = $usuario['id'];

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

        
        ob_start(); ?>
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>FACTURA PYMES</title>
            <style>
                body { font-family: Arial, sans-serif; }
                h1 { color: #1a8fe2; }
                table { width: 100%; border-collapse: collapse; margin-top: 25px; }
                th, td { border: 2px solid #ccc; padding: 10px; text-align: left; }
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

            <h2>Total pagado: $<?= number_format($data['total'], 2) ?></h2>
        </body>
        </html>
        <?php
        $html = ob_get_clean();

        $dompdf = new Dompdf();
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
        $pdfString = $dompdf->output();

        // AQUI SE ENVIA EL CORREO ELECTRONICO
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'karen.rivera8887@gmail.com';    
        $mail->Password = 'sisg mprx wlpb mfhg';         
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('karen.rivera8887@gmail.com', 'Mi Tienda');
        $mail->addAddress($data['correo'], $data['nombre']);
        $mail->isHTML(true);
        $mail->Subject = '🧾 Factura de tu compra';

        $mail->Body = '
            <h2>Gracias por tu compra, ' . htmlspecialchars($data['nombre']) . '</h2>
            <p>Adjuntamos tu factura en PDF.</p>
            <p>Total pagado: <strong>$' . number_format($data['total'], 2) . '</strong></p>
            <p><em> PYMES - TU MEJOR ALIADO!!</em></p>
        ';

        $mail->addStringAttachment($pdfString, 'Factura.pdf');
        $mail->send();

        echo json_encode(["success" => true, "message" => "Factura enviada, revisa tu correo electronico"]);
    } catch (Exception $e) {
        if ($conn->inTransaction()) {
            $conn->rollBack();
        }
        echo json_encode([
            "success" => false,
            "message" => "Error al procesar la compra",
            "error" => $e->getMessage()
        ]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
}
