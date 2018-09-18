<?php

class Reserva extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.reserva');
        $this->hasColumn('idreserva', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'rrhh.reserva_idreserva'));
        $this->hasColumn('reserva', 'character varying', 255, array('notnull' => false, 'primary' => false));
    }

    public function getReservaes($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Reserva n')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Reserva n')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("n.reserva ilike '%" . $criterio . "%'");
                $queryCount->addWhere("n.reserva ilike '%" . $criterio . "%'");
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
