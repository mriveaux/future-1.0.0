<?php 
 class Maestro extends Doctrine_Record {

	public function setUp() {
	parent::setUp();
 }

 public function setTableDefinition() {
$this->setTableName('taller.maestro');
$this->hasColumn('idmaestro', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'taller.maestro_idmaestro'));
$this->hasColumn('maestro', 'character varying', 255, array('notnull' => false, 'primary' => false));
}public function getMaestroes($post) {
try {
 $query = Doctrine_Query::create();
$queryCount = Doctrine_Query::create();
$query->from('Maestro n')->offset($post->start)
->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
$queryCount->from('Maestro n')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
if (isset($post->criterio) && strlen($post->criterio) > 0) {
$criterio = $post->criterio;
$query->addWhere("n.maestro ilike '%" . $criterio . "%'");
$queryCount->addWhere("n.maestro ilike '%" . $criterio . "%'");
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
