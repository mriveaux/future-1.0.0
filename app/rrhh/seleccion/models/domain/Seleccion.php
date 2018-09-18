<?php

class Seleccion extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.seleccions');
        $this->hasColumn('idseleccions', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'rrhh.seleccions_idseleccions'));
        $this->hasColumn('seleccions', 'character varying', 255, array('notnull' => false, 'primary' => false));
    }

    public function getSelecciones($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Seleccion n')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Seleccion n')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("n.seleccions ilike '%" . $criterio . "%'");
                $queryCount->addWhere("n.seleccions ilike '%" . $criterio . "%'");
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
