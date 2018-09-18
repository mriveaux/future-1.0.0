<?php 
 class Chat extends Doctrine_Record {

	public function setUp() {
	parent::setUp();
 }

 public function setTableDefinition() {
$this->setTableName('soporte.chat');
$this->hasColumn('idchat', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'soporte.chat_idchat'));
$this->hasColumn('chat', 'character varying', 255, array('notnull' => false, 'primary' => false));
}public function getChates($post) {
try {
 $query = Doctrine_Query::create();
$queryCount = Doctrine_Query::create();
$query->from('Chat n')->offset($post->start)
->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
$queryCount->from('Chat n')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
if (isset($post->criterio) && strlen($post->criterio) > 0) {
$criterio = $post->criterio;
$query->addWhere("n.chat ilike '%" . $criterio . "%'");
$queryCount->addWhere("n.chat ilike '%" . $criterio . "%'");
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
