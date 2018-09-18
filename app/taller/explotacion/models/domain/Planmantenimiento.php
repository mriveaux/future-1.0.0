<?php 
 class Planmantenimiento extends Doctrine_Record {

	public function setUp() {
	parent::setUp();
 }

 public function setTableDefinition() {
$this->setTableName('taller.planmantenimiento');
$this->hasColumn('idplanmantenimiento', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'taller.planmantenimiento_idplanmantenimiento'));
$this->hasColumn('planmantenimiento', 'character varying', 255, array('notnull' => false, 'primary' => false));
}public function getPlanmantenimientoes($post) {
try {
 $query = Doctrine_Query::create();
$queryCount = Doctrine_Query::create();
$query->from('Planmantenimiento n')->offset($post->start)
->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
$queryCount->from('Planmantenimiento n')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
if (isset($post->criterio) && strlen($post->criterio) > 0) {
$criterio = $post->criterio;
$query->addWhere("n.planmantenimiento ilike '%" . $criterio . "%'");
$queryCount->addWhere("n.planmantenimiento ilike '%" . $criterio . "%'");
}
$query->addOrderBy('n.fecha');
$result = $query->execute();
$count = $queryCount->execute();
return array('data' => $result, 'total' => $count->count());
} catch (Exception $exc) {
throw $exc;
}
}
}
