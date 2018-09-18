<?php

class Docidentidad extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Categoriadoc', array('local' => 'idcategoriadocidentidad', 'foreign' => 'idcategoriadocidentidad'));
        $this->hasOne('Registropersona', array('local' => 'idpersona', 'foreign' => 'idpersona'));
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.dat_docidentidad');
        $this->hasColumn('iddocidentidad', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'rrhh.dat_docidentidad_iddocidentidad'));
        $this->hasColumn('idcategoriadocidentidad', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idpersona', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('numero', 'character varying', 20, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fechaexpedicion', 'date', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fechavencimiento', 'date', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('rector', 'numeric', 1, array('notnull' => false, 'primary' => false));
    }

    public function getDocidentidad($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Docidentidad c')->innerJoin('c.Categoriadoc cd')->orderBy('cd.nombre')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Docidentidad c')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            $query->addWhere("c.idpersona = " . $post->_request['idpersona']);
            $queryCount->addWhere("c.idpersona = " . $post->_request['idpersona']);
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

    public function getListDocidentidadService() {
        try {
            $query = Doctrine_Query::create();
            $query->from('Docidentidad c')->orderBy('c.nombre')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $result = $query->execute();
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
