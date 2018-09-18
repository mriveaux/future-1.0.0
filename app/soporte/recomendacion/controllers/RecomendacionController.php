<?php 
 class RecomendacionController extends ControllerSecure 
{

public function __construct() {
 parent::__construct(); 
}
public function recomendacionAction() {
$this->render('recomendacion');
}
}