<?php 
 class RegistroempleadoController extends ControllerSecure 
{

private $registroempleado;
private $registroempleadoModel;

public function __construct() {
 parent::__construct();
$this->registroempleado = new Registroempleado();
$this->registroempleadoModel = new RegistroempleadoModel(); 
}
public function registroempleadoAction() {
$this->render('registroempleado');
}
public function getregistroempleadoAction(){
echo json_encode($this->registroempleado->getRegistroempleadoes());
}
public function addregistroempleadoAction() {
echo json_encode($this->registroempleadoModel->addRegistroempleado($this->dataPost));
}

public function modregistroempleadoAction() {
echo json_encode($this->registroempleadoModel->modRegistroempleado($this->dataPost));
}

public function delregistroempleadoAction() {
echo json_encode($this->registroempleadoModel->delRegistroempleado($this->dataPost));
}

}