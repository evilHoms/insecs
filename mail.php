<?php 
$to = 'klop071@yandex.ru';
$message = 'Телефон: ' . $_POST['phone'] . "\r\n" . 'Вредитель: ' . $_POST['type'] . "\r\n"  . 'Тип объекта: ' . $_POST['category'] . "\r\n" . 'Размер: ' . $_POST['size'] . "\r\n" . 'Город: ' . $_POST['city'];
$headers = 'Заказ' . "\r\n";

mail($to, $headers, $message); 
 
if(@mail) {

echo "<center>Сообщение доставлено <br> <img src='images/success.png'></center>";// тут ссылка на картинку или страницу, которая появиться после заполнения формы
} else {
echo "<center>Сообщение не доставлено <br><img src='images/error.png'></center>";// тут ссылка на картинку или страницу, если будет ошибка отправки
}
 
?>