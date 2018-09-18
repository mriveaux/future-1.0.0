<?php

class Colorpelo extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.nom_colorpelo');
        $this->hasColumn('idcolorpelo', 'numeric', 19, array('notnull' => false, 'primary' => true));
        $this->hasColumn('nombre', 'character varying', 50, array('notnull' => false, 'primary' => false));
    }

    public function getColorpelo($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Colorpelo c')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Colorpelo c')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            $query->addOrderBy('c.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getListColorpelosService() {
        try {
            $query = Doctrine_Query::create();
            $query->from('Colorpelo c')->orderBy('c.nombre')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $result = $query->execute();
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
