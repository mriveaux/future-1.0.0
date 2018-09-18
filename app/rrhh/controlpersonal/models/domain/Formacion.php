<?php

class Formacion extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.dat_estudios');
        $this->hasColumn('idestudio', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'rrhh.dat_estudios_idestudio'));
        $this->hasColumn('idpersona', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('tipoestudio', 'character varying', 100, array('notnull' => false, 'primary' => false));
        $this->hasColumn('centroestudio', 'character varying', 100, array('notnull' => false, 'primary' => false));
        $this->hasColumn('evaluacion', 'numeric', 10, array('notnull' => false, 'primary' => false));
        $this->hasColumn('desde', 'date', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('hasta', 'date', null, array('notnull' => false, 'primary' => false));
    }

    public function getFormacion($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Formacion s')->offset($post->start)->limit($post->limit)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Formacion s')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            $query->addWhere("s.idpersona = " . $post->_request['idpersona']);
            $queryCount->addWhere("s.idpersona = " . $post->_request['idpersona']);
            if (isset($post->_request['criterio']) && strlen($post->_request['criterio']) > 0) {
                $criterio = $post->_request['criterio'];
                $query->addWhere("s.tipoestudio ilike '%" . $criterio . "%'");
                $queryCount->addWhere("s.tipoestudio ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('s.tipoestudio,s.centroestudio');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getListFormacionsService($argIdpersona) {
        try {
            $query = Doctrine_Query::create();
            $query->from('Formacion s')->orderBy('s.tipoestudio,s.centroestudio')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $query->addWhere("s.idpersona = $argIdpersona");
            $result = $query->execute();
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
