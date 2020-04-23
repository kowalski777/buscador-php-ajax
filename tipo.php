<?php 

$data = json_decode(file_get_contents('data-1.json'));

$tipo = [];
foreach ($data as $value) {
array_push($tipo, $value->Tipo);
}
echo json_encode(array_unique($tipo));