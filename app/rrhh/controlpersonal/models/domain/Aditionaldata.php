<?php

class Aditionaldata extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.nom_datosadicionales');
        $this->hasColumn('iddatoadicional', 'numeric', 19, array('notnull' => true, 'primary' => true, 'sequence' => 'rrhh.nom_datosadicionales_iddatoadicional'));
        $this->hasColumn('agrupador', 'character varying', 100, array('notnull' => true, 'primary' => false));
        $this->hasColumn('clasificacion', 'character varying', 100, array('notnull' => true, 'primary' => false));
        $this->hasColumn('clsname', 'character varying', 100, array('notnull' => true, 'primary' => false));
        $this->hasColumn('alias', 'character varying', 100, array('notnull' => true, 'primary' => false));
    }

    public function getAditionaldata($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Aditionaldata a')
                    ->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Aditionaldata a')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            $query->addOrderBy('a.agrupador,a.clasificacion');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getListAditionalDataService() {
        try {
            $query = Doctrine_Query::create();
            $query->from('Aditionaldata a')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $query->addOrderBy('a.agrupador,a.clasificacion');
            return $query->execute();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
