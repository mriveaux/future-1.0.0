<?php

class Tipocontrato extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Registroempleado', array('local' => 'idempleado', 'foreign' => 'idempleado'));
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.dat_tipocontrato');
        $this->hasColumn('idtipocontrato', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'rrhh.dat_tipocontrato_idtipocontrato'));
        $this->hasColumn('tipocontrato', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fechainicio', 'date', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fechafin', 'date', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('observacion', 'character varing', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idcargoplantilla', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idempleado', 'numeric', 19, array('notnull' => false, 'primary' => false));
    }

    public function getTipocontratoes($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Tipocontrato n')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Tipocontrato n')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("n.registroempleado ilike '%" . $criterio . "%'");
                $queryCount->addWhere("n.registroempleado ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('n.fecha');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
