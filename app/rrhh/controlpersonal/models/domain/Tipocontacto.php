<?php

class Tipocontacto extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.nom_tipocontacto');
        $this->hasColumn('idtipocontacto', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'rrhh.nom_tipocontacto_idtipocontacto'));
        $this->hasColumn('nombre', 'character varying', 50, array('notnull' => false, 'primary' => false));
    }

    public function getTipocontacto($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Tipocontacto c')->orderBy('c.nombre')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Tipocontacto c')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
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

    public function getListTipocontactosService() {
        try {
            $query = Doctrine_Query::create();
            $query->from('Tipocontacto c')->orderBy('c.nombre')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $result = $query->execute();
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
