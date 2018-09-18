<?php

class Direccion extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
//        $this->hasOne('Pais', array('local' => 'idpais', 'foreign' => 'idpais'));
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.dat_direccion');
        $this->hasColumn('iddireccion', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'rrhh.dat_direccion_iddireccion'));
        $this->hasColumn('idlocalidad', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('direccion', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fdesde', 'date', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fhasta', 'date', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('rector', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idpersona', 'numeric', 19, array('notnull' => false, 'primary' => false));
    }

    public function getDireccion($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Direccion d')//->innerJoin('d.Pais p')
                    ->offset($post->start)->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Direccion d')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            $query->addWhere("d.idpersona = " . $post->_request['idpersona']);
            $queryCount->addWhere("d.idpersona = " . $post->_request['idpersona']);
            if (isset($post->_request['criterio']) && strlen($post->_request['criterio']) > 0) {
                $criterio = $post->_request['criterio'];
//                $query->addWhere("d.nombre ilike '%" . $criterio . "%'");
//                $queryCount->addWhere("d.nombre ilike '%" . $criterio . "%'");
            }
//            $query->addOrderBy('p.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getListDireccionsService() {
        try {
            $query = Doctrine_Query::create();
            $query->from('Direccion d')->orderBy('d.direccion')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $result = $query->execute();
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
