<?php

class Territorio extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('maestros.nom_territorio');
        $this->hasColumn('idterritorio', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'maestros.nom_territorio_idterritorio'));
        $this->hasColumn('abreviatura', 'character varying', 30, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('codigo', 'numeric', 19, array('notnull' => false, 'primary' => false));
    }

    public function getTerritorios($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Territorio n')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Territorio n')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("n.nombre ilike '%" . $criterio . "%'");
                $query->orWhere("n.abreviatura ilike '%" . $criterio . "%'");
                $queryCount->addWhere("n.nombre ilike '%" . $criterio . "%'");
                $queryCount->orWhere("n.abreviatura ilike '%" . $criterio . "%'");
            }
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count(), 'success' => true);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
