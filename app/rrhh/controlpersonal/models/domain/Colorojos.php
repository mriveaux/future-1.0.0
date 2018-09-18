<?php

class Colorojos extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.nom_colorojos');
        $this->hasColumn('idcolorojos', 'numeric', 19, array('notnull' => false, 'primary' => true));
        $this->hasColumn('nombre', 'character varying', 50, array('notnull' => false, 'primary' => false));
    }

    public function getColorojos($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Colorojos c')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Colorojos c')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            $query->addOrderBy('c.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getListColorojossService() {
        try {
            $query = Doctrine_Query::create();
            $query->from('Colorojos c')->orderBy('c.nombre')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $result = $query->execute();
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
