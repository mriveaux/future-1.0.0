<?php

class Tipopreparacion extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.nom_tipopreparacion');
        $this->hasColumn('idtipopreparacion', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'rrhh.nom_tipopreparacion_idtipopreparacion'));
        $this->hasColumn('nombre', 'character varying', 50, array('notnull' => false, 'primary' => false));
    }

    public function getTipopreparacion($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Tipopreparacion c')->orderBy('c.nombre')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Tipopreparacion c')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->_request['criterio']) && strlen($post->_request['criterio']) > 0) {
                $criterio = $post->_request['criterio'];
                $query->addWhere("c.nombre ilike '%" . $criterio . "%' OR c.descripcion ilike '%");
                $queryCount->addWhere("c.nombre ilike '%" . $criterio . "%' OR c.descripcion ilike '%");
            }
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getListTipopreparacionsService() {
        try {
            $query = Doctrine_Query::create();
            $query->from('Tipopreparacion c')->orderBy('c.nombre')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $result = $query->execute();
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
