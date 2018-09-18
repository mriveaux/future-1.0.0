<?php

class Categoriacientifica extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.dat_categoriacientifica');
        $this->hasColumn('idcategoriacientifica', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'rrhh.dat_categoriacientifica_idcategoriacientifica'));
        $this->hasColumn('idpersona', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', 100, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fecha', 'date', null, array('notnull' => false, 'primary' => false));
    }

    public function getCategoriacientifica($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Categoriacientifica c')->offset($post->start)->limit($post->limit)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Categoriacientifica c')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            $query->addWhere("c.idpersona = " . $post->_request['idpersona']);
            $queryCount->addWhere("c.idpersona = " . $post->_request['idpersona']);
            if (isset($post->_request['criterio']) && strlen($post->_request['criterio']) > 0) {
                $criterio = $post->_request['criterio'];
                $query->addWhere("c.nombre ilike '%" . $criterio . "%'");
                $queryCount->addWhere("c.nombre ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('c.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getListCategoriacientificasService($argIdpersona) {
        try {
            $query = Doctrine_Query::create();
            $query->from('Categoriacientifica c')->orderBy('c.nombre')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $query->addWhere("c.idpersona = $argIdpersona");
            $result = $query->execute();
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
