<?php

class Ciudadania extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Pais', array('local' => 'idpais', 'foreign' => 'idpais'));
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.dat_ciudadania');
        $this->hasColumn('idciudadania', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'rrhh.dat_ciudadania_idciudadania'));
        $this->hasColumn('idpersona', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idpais', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fecha', 'date', null, array('notnull' => false, 'primary' => false));
    }

    public function getCiudadania($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Ciudadania c')->innerJoin('c.Pais p')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Ciudadania c')->innerJoin('c.Pais p')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            $query->addWhere("c.idpersona = " . $post->_request['idpersona']);
            $queryCount->addWhere("c.idpersona = " . $post->_request['idpersona']);
            if (isset($post->_request['criterio']) && strlen($post->_request['criterio']) > 0) {
                $criterio = $post->_request['criterio'];
                $query->addWhere("p.nacionalidad ilike '%" . $criterio . "%'");
                $queryCount->addWhere("p.nacionalidad ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('p.pais');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getListCiudadaniasService() {
        try {
            $query = Doctrine_Query::create();
            $query->from('Ciudadania c')->orderBy('c.nombre')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $result = $query->execute();
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
