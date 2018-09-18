<?php

class Noconformidad extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('soporte.noconformidad');
        $this->hasColumn('idnoconformidad', 'numeric', 19, array('notnull' => true, 'primary' => true, 'sequence' => 'soporte.noconformidad_idnoconformidad'));
        $this->hasColumn('noconformidad', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('ruta', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idusuario', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('estado', 'numeric', 1, array('notnull' => false, 'primary' => false));
        $this->hasColumn('percent', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fecha', 'date', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('imagen', 'text', null, array('notnull' => false, 'primary' => false));
    }

    public function getNoconformidades($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Noconformidad nc')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Noconformidad nc')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("nc.noconformidad ilike '%" . $criterio . "%'");
                $queryCount->addWhere("nc.noconformidad ilike '%" . $criterio . "%'");
            }
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
