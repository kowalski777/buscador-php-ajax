<?php

  $nombreArchivo = "data-1.json";
  $archivo = fopen($nombreArchivo, "r");
  $datos = fread($archivo, filesize($nombreArchivo));
  $listaDatos = json_decode($datos);
  $newData = array();

  //$listaDatos = json_decode(file_get_contents('data-1.json'));

//print_r($listaDatos);

if(isset($_POST["ciudad"]) && isset($_POST["tipo"]) && isset($_POST["from"]) && isset($_POST["to"])){
    $ciudad = $_POST["ciudad"];
    $tipo = $_POST["tipo"];
    $from = $_POST["from"];
    $to = $_POST["to"];


for($i=0; $i < count($listaDatos); $i++){
    $Precio = str_replace('$', '', str_replace(',', '', str_replace(' ', '', $listaDatos[$i]->Precio)));
    if($Precio >= $from && $Precio <= $to && $listaDatos[$i]->Ciudad == $ciudad && $listaDatos[$i]->Tipo == $tipo){
      array_push($newData, $listaDatos[$i]);
    }else if($Precio >= $from && $Precio <= $to && $listaDatos[$i]->Ciudad == $ciudad && $tipo == ""){
      array_push($newData, $listaDatos[$i]);
    }else if($Precio >= $from && $Precio <= $to && $listaDatos[$i]->Tipo == $tipo && $ciudad == ""){
      array_push($newData, $listaDatos[$i]);
    }else if($Precio >= $from && $Precio <= $to && $ciudad == "" && $tipo == ""){
      array_push($newData, $listaDatos[$i]);
    }
  }
  echo json_encode($newData);
}else if(isset($_POST["todos"])){
  echo $datos;
}
  fclose($archivo);
?>