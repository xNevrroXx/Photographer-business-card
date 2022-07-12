<?php
// $method = $_SERVER['REQUEST_METHOD'];

// //Script Foreach
// $c = true;
// if ( $method === 'POST' ) {

// 	$project_name = trim($_POST["project_name"]);
// 	$admin_email  = trim($_POST["admin_email"]);
// 	$form_subject = trim($_POST["form_subject"]);

// 	foreach ( $_POST as $key => $value ) {
// 		if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
// 			$message .= "
// 			" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
// 				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
// 				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
// 			</tr>
// 			";
// 		}
// 	}
// } else if ( $method === 'GET' ) {

// 	$project_name = trim($_GET["project_name"]);
// 	$admin_email  = trim($_GET["admin_email"]);
// 	$form_subject = trim($_GET["form_subject"]);

// 	foreach ( $_GET as $key => $value ) {
// 		if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
// 			$message .= "
// 			" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
// 				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
// 				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
// 			</tr>
// 			";
// 		}
// 	}
// }

// $message = "<table style='width: 100%;'>$message</table>";

// function adopt($text) {
// 	return '=?UTF-8?B?'.Base64_encode($text).'?=';
// }

// $headers = "MIME-Version: 1.0" . PHP_EOL .
// "Content-Type: text/html; charset=utf-8" . PHP_EOL .
// 'From: '.adopt($project_name).' <'.$admin_email.'>' . PHP_EOL .
// 'Reply-To: '.$admin_email.'' . PHP_EOL;

// mail($admin_email, adopt($form_subject), $message, $headers );




// TEST 5 with the static fields

header("Access-Control-Allow-Origin: *");
require_once('phpmailer/PHPMailerAutoload.php');


$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

function adopt($text) {
	return '=?UTF-8?B?'.Base64_encode($text).'?=';
}

$project_name = trim($_POST["project_name"]);
// $admin_email  = trim($_POST["admin_email"]);
$form_subject = trim($_POST["form_subject"]);

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$letter = $_POST['letter'];
$formSubject = $_POST['form_subject'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                                 // Enable SMTP authentication
$mail->Username = 'business_konstantin-photo@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'WbP1RWox71k8ytlIhggW'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('value', adopt($project_name)); // от кого будет уходить письмо?
$mail->addAddress('business_konstantin-photo@mail.ru');     // Кому будет уходить письмо
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = adopt($project_name);
// $message = '' .$name . ' оставил заявку, его телефон ' .$phone. '<br>Почта этого пользователя: ' .$email. 'Вот сообщение от этого пользователя: ' .$letter;
$mail->Body    = "
    <table style='width: 100%;'>
        <tr style='width: 100%; background-color: #f8f8f8;'>
            <td style='width: 30px; padding: 10px; border: #e9e9e9 1px solid;'><b>Где заполнена форма</b></td>
            <td style='width: 70px; padding: 10px; border: #e9e9e9 1px solid;'>$formSubject</td>
        </tr>
        <tr style='width: 100%; background-color: #f8f8f8;'>
            <td style='width: 30px; padding: 10px; border: #e9e9e9 1px solid;'><b>Имя</b></td>
            <td style='width: 70px; padding: 10px; border: #e9e9e9 1px solid;'>$name</td>
        </tr>
        <tr style='width: 100%; background-color: #f8f8f8;'>
            <td style='width: 30px; padding: 10px; border: #e9e9e9 1px solid;'><b>Телефон</b></td>
            <td style='width: 70px; padding: 10px; border: #e9e9e9 1px solid;'>$phone</td>
        </tr>
        <tr style='width: 100%; background-color: #f8f8f8;'>
            <td style='width: 30px; padding: 10px; border: #e9e9e9 1px solid;'><b>E-mail</b></td>
            <td style='width: 70px; padding: 10px; border: #e9e9e9 1px solid;'>$email</td>
        </tr>
        <tr style='width: 100%; background-color: #f8f8f8;'>
            <td style='width: 30px; padding: 10px; border: #e9e9e9 1px solid;'><b>Сообщение</b></td>
            <td style='width: 70px; padding: 10px; border: #e9e9e9 1px solid;'>$letter</td>
        </tr>
    </table>
";
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    echo 'Success';
}