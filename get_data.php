<?php

$con = mysql_connect("localhost", "root", "");
mysql_select_db("nn");

$sql = "select * from training_data";
$res = mysql_query($sql);

$data = array();
while($row = mysql_fetch_array($res)){
	array_push($data, array(
			'value'	=>	$row['actual_value'],
			'data'	=>	$row['data']
		));
}
echo json_encode($data);