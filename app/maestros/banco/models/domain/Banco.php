<?php

class Banco extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('maestros.nom_banco');
        $this->hasColumn('idbanco', 'numeric', 19, array('notnull' => true, 'primary' => true, 'sequence' => 'maestros.nom_banco_idbanco'));
        $this->hasColumn('banco', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('codigo', 'character varying', 30, array('notnull' => true, 'primary' => false));
        $this->hasColumn('abreviatura', 'character varying', 30, array('notnull' => false, 'primary' => false));
    }

    public function getBancos($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('banco b')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('banco b')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("b.banco ilike '%" . $criterio . "%'");
                $queryCount->addWhere("b.banco ilike '%" . $criterio . "%'");
            }
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }


}
