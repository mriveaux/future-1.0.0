<?php

class Tallaje extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Prenda', array('local' => 'idprenda', 'foreign' => 'idprenda'));
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.dat_tallaje');
        $this->hasColumn('idtallaje', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'rrhh.dat_tallaje_idtallaje'));
        $this->hasColumn('idprenda', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('talla', 'character varying', 20, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idpersona', 'numeric', 19, array('notnull' => false, 'primary' => false));
    }

    public function getTallaje($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Tallaje t')->innerJoin('t.Prenda p')
                    ->offset($post->start)->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Tallaje t')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            $query->addWhere("t.idpersona = " . $post->_request['idpersona']);
            $queryCount->addWhere("t.idpersona = " . $post->_request['idpersona']);
            if (isset($post->_request['criterio']) && strlen($post->_request['criterio']) > 0) {
                $criterio = $post->_request['criterio'];
                $query->addWhere("p.nombre ilike '%" . $criterio . "%'");
                $queryCount->addWhere(".nombre ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('p.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getListTallajesService() {
        try {
            $query = Doctrine_Query::create();
            $query->from('Tallaje t')->innerJoin('t.Prenda p')->orderBy('p.nombre')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $result = $query->execute();
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
