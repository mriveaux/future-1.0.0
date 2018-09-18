<?php

class Estratificacion extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.nom_estratificacion');
        $this->hasColumn('idestratificacion', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'rrhh.nom_estratificacion_idestratificacion'));
        $this->hasColumn('nombre', 'character varying', 50, array('notnull' => false, 'primary' => false));
    }

    public function getEstratificaciones($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Estratificacion e')->orderBy('e.nombre')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Estratificacion e')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->_request['criterio']) && strlen($post->_request['criterio']) > 0) {
                $criterio = $post->_request['criterio'];
                $query->addWhere("e.nombre ilike '%" . $criterio . "%'");
                $queryCount->addWhere("e.nombre ilike '%" . $criterio . "%'");
            }
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getListEstratificacionesService() {
        try {
            $query = Doctrine_Query::create();
            $query->from('Estratificacion e')->orderBy('e.nombre')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $result = $query->execute();
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
