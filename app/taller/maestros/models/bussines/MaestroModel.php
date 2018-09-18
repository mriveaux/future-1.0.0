<?php 
 class MaestroModel extends ModelSecure
{
public function __construct()
 {
 parent::__construct(); 
}

	public function addMaestro($data) {
try {
$maestro = new Maestro();
$maestro->idmaestro = $data->idmaestro;
$maestro->maestro = $data->maestro;
$maestro->save();
return 1;
} catch (Doctrine_Exception $e) {
throw $e;
}
}

public function modMaestro($data) {
try {
$maestro = Doctrine_Core::getTable('Maestro')->find($data->idmaestro);
$maestro->maestro = $data->maestro;
$maestro->save();
return 1;
} catch (Doctrine_Exception $e) {
throw $e;
}
}

public function delMaestro($id) {
try {
$maestro = Doctrine_Core::getTable('Maestro')->find($id);
$maestro->delete();
return 1;
} catch (Doctrine_Exception $e) {
throw $e;
}
}

}
