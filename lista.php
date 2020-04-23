<?php 

$data = json_decode(file_get_contents('data-1.json'));

$citys = [];
foreach ($data as $value) {
array_push($citys, $value->Ciudad);
}
echo json_encode(array_unique($citys));





