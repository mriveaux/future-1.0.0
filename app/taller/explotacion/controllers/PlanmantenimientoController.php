<?php 
 class PlanmantenimientoController extends ControllerSecure 
{

private $planmantenimiento;
private $planmantenimientoModel;

public function __construct() {
 parent::__construct();
$this->planmantenimiento = new Planmantenimiento();
$this->planmantenimientoModel = new PlanmantenimientoModel(); 
}
public function planmantenimientoAction() {
$this->render('planmantenimiento');
}
public function getplanmantenimientoAction(){
echo json_encode($this->planmantenimiento->getPlanmantenimientoes());
}
public function addplanmantenimientoAction() {
echo json_encode($this->planmantenimientoModel->addPlanmantenimiento($this->dataPost));
}

public function modplanmantenimientoAction() {
echo json_encode($this->planmantenimientoModel->modPlanmantenimiento($this->dataPost));
}

public function delplanmantenimientoAction() {
echo json_encode($this->planmantenimientoModel->delPlanmantenimiento($this->dataPost));
}

}