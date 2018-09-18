<?php

class Mediocontacto extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.nom_mediocontacto');
        $this->hasColumn('idmediocontacto', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'rrhh.nom_mediocontacto_idmediocontacto'));
        $this->hasColumn('nombre', 'character varying', 50, array('notnull' => false, 'primary' => false));
    }

    public function getMediocontacto($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Mediocontacto c')->orderBy('c.nombre')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Mediocontacto c')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
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

    public function getListMediocontactosService() {
        try {
            $query = Doctrine_Query::create();
            $query->from('Mediocontacto c')->orderBy('c.nombre')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $result = $query->execute();
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
