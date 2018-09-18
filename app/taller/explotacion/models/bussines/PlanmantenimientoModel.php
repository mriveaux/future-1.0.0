<?php 
 class PlanmantenimientoModel extends ModelSecure
{
public function __construct()
 {
 parent::__construct(); 
}

	public function addPlanmantenimiento($data) {
try {
$planmantenimiento = new Planmantenimiento();
$planmantenimiento->idplanmantenimiento = $data->idplanmantenimiento;
$planmantenimiento->planmantenimiento = $data->planmantenimiento;
$planmantenimiento->save();
return 1;
} catch (Doctrine_Exception $e) {
throw $e;
}
}

public function modPlanmantenimiento($data) {
try {
$planmantenimiento = Doctrine_Core::getTable('Planmantenimiento')->find($data->idplanmantenimiento);
$planmantenimiento->planmantenimiento = $data->planmantenimiento;
$planmantenimiento->save();
return 1;
} catch (Doctrine_Exception $e) {
throw $e;
}
}

public function delPlanmantenimiento($id) {
try {
$planmantenimiento = Doctrine_Core::getTable('Planmantenimiento')->find($id);
$planmantenimiento->delete();
return 1;
} catch (Doctrine_Exception $e) {
throw $e;
}
}

}
