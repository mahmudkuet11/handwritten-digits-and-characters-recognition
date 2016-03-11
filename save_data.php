<?php

$con = mysql_connect("localhost", "root", "");
mysql_select_db("nn");

$value = $_POST['value'];
$data = $_POST['data'];

$sql = "INSERT INTO `nn`.`training_data` (`id`, `actual_value`, `data`) VALUES (NULL, '". $value ."', '". $data ."');";
mysql_query($sql);