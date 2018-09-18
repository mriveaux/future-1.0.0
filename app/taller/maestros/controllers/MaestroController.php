<?php 
 class MaestroController extends ControllerSecure 
{

private $maestro;
private $maestroModel;

public function __construct() {
 parent::__construct();
$this->maestro = new Maestro();
$this->maestroModel = new MaestroModel(); 
}
public function maestroAction() {
$this->render('maestro');
}
public function getmaestroAction(){
echo json_encode($this->maestro->getMaestroes());
}
public function addmaestroAction() {
echo json_encode($this->maestroModel->addMaestro($this->dataPost));
}

public function modmaestroAction() {
echo json_encode($this->maestroModel->modMaestro($this->dataPost));
}

public function delmaestroAction() {
echo json_encode($this->maestroModel->delMaestro($this->dataPost));
}

}