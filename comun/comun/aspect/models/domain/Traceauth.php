<?php

class Traceauth extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('traza.dat_trazaauth');
        $this->hasColumn('idtraza', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'traza.dat_trazaauth_idtraza'));
        $this->hasColumn('usuario', 'character varying', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('tipotraza', 'character varying', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('accion', 'character varying', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('origen', 'character varying', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('url', 'character varying', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('parametros', 'text', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('ip', 'character varying', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('fecha', 'date', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('hora', 'character varying', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('memoria', 'numeric', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('tiempor', 'numeric', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('opsystem', 'character varying', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('browser', 'character varying', null, array('notnull' => true, 'primary' => false));
    }

    public function setUp() {
        parent::setUp();
    }

    public function loadDetllesAuth($post) {
        try {
            $start = $post->start;
            $limit = $post->limit;
            if (!isset($post->usuario) || $post->usuario == '') {
                $query = Doctrine_Query::create();
                $result = $query->select('*')
                        ->from('Traceauth th')
                        ->offset($start)
                        ->limit($limit)
                        ->orderBy('th.idtraza DESC')
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();

                $query1 = Doctrine_Query::create();
                $resulttotal = $query1->select('count(th.idtraza) as total')
                        ->from('Traceauth th')
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();
            } else {
                $where = ($post->desde != "") ? "th.usuario ='" . $post->usuario . "' AND th.fecha BETWEEN '" . $post->desde . "' AND '" . $post->hasta . "'" : "th.usuario ='" . $post->usuario . "' AND th.fecha < '" . $post->hasta . "'";
                $query = Doctrine_Query::create();
                $result = $query->select('*')
                        ->from('Traceauth th')
                        ->where($where)
                        ->offset($start)
                        ->limit($limit)
                        ->orderBy('th.idtraza DESC')
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();

                $query1 = Doctrine_Query::create();
                $resulttotal = $query1->select('count(th.idtraza) as total')
                        ->from('Traceauth th')
                        ->where($where)
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();
            }
            return array('campos' => $result, 'totalRecords' => $resulttotal[0]['total']);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function deleteTracesAuth($argDate) {
        try {
            $query = Doctrine_Query::create();
            $query->delete()->from('Traceauth th')->where("th.fecha < $argDate")->execute();
            return 1;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * Carga los accesos de los ultimos siete dias
     */
    public function loadLastSevenDayAccess($fInicio, $fFin) {
        try {
            $where = "th.fecha BETWEEN '" . $fInicio . "' AND '" . $fFin . "'";
            $query = Doctrine_Query::create();
            return $query->select('*')
                            ->from('Traceauth th')
                            ->where($where)
                            ->orderBy('th.fecha ASC')
                            ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                            ->execute();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function revertDate($agDate) {
        try {
            $date = explode('-', $agDate);
            return implode('/', array_reverse($date));
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
