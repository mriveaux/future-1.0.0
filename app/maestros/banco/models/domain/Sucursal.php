<?php

class Sucursal extends Doctrine_Record {

    public function setUp() {
        parent:: setUp();
        $this->hasOne('Banco', array('local' => 'idbanco', 'foreign' => 'idbanco'));
    }

    public function setTableDefinition() {
        $this->setTableName('maestros.nom_sucursal');
        $this->hasColumn('idsucursal', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'maestros.nom_sucursal_idsucursal'));
        $this->hasColumn('numero', 'character varying', 30, array('notnull' => false, 'primary' => false));
        $this->hasColumn('direccion', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idbanco', 'numeric', 19, array('notnull' => false, 'primary' => false));
    }

    public function getSucursales($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Sucursal s')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Sucursal s')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->idbanco) && strlen($post->idbanco) > 0) {
                $idBanco = $post->idbanco;
                $query->addWhere('idbanco = ?', $idBanco);
                $queryCount->addWhere('idbanco = ?', $idBanco);
            }
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("s.numero ilike '%" . $criterio . "%' OR s.direccion ilike '%" . $criterio . "%'");
                $queryCount->addWhere("s.numero ilike '%" . $criterio . "%' OR s.direccion ilike '%" . $criterio . "%'");
            }
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
