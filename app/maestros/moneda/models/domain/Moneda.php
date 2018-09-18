<?php

class Moneda extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Pais', array('local' => 'idpais', 'foreign' => 'idpais'));
    }

    public function setTableDefinition() {
        $this->setTableName('maestros.nom_moneda');
        $this->hasColumn('idmoneda', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'maestros.nom_moneda_idmoneda'));
        $this->hasColumn('codigonum', 'numeric', 3, array('notnull' => true, 'primary' => false));
        $this->hasColumn('codigoiso', 'character varying', 3, array('notnull' => false, 'primary' => false));
        $this->hasColumn('moneda', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('pais', 'character varying', 255, array('notnull' => true, 'primary' => false));
        $this->hasColumn('simbolo', 'character varying', 30, array('notnull' => true, 'primary' => false));
        $this->hasColumn('presicion', 'numeric', 2, array('notnull' => true, 'primary' => false));
        $this->hasColumn('factorredondeo', 'float', 19, array('notnull' => true, 'primary' => false));
        $this->hasColumn('idpais', 'numeric', 19, array('notnull' => true, 'primary' => false));
    }

    public function getMonedas($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->select('m.*, p.pais')->from('Moneda m')->leftJoin('m.Pais p')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Moneda m')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("m.moneda ilike '%" . $criterio . "%'");
                $query->orWhere("m.codigoiso ilike '%" . $criterio . "%'");
                $query->orWhere("m.codigonum ilike '%" . $criterio . "%'");
                $queryCount->addWhere("m.moneda ilike '%" . $criterio . "%'");
                $queryCount->orWhere("m.codigoiso ilike '%" . $criterio . "%'");
                $queryCount->orWhere("m.codigonum ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('m.codigoiso, m.codigonum');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count(), 'success' => true);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
