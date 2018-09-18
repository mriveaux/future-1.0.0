<?php

class Trace extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('traza.dat_traza');
        $this->hasColumn('idtraza', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'traza.dat_traza_idtraza'));
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
        $this->hasColumn('identidad', 'numeric', null, array('notnull' => true, 'primary' => false));
    }

    public function setUp() {
        parent::setUp();
    }

    public function loadDetllesTraza($post, $identidad) {
        try {
            $start = $post->start;
            $limit = $post->limit;
            if (!isset($post->usuario) || $post->usuario == '') {
                $query = Doctrine_Query::create();
                $result = $query->select('*')
                        ->from('Trace t')
                        ->where('t.identidad=? ', array($identidad))
                        ->offset($start)
                        ->limit($limit)
                        ->orderBy('t.idtraza DESC')
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();

                $query1 = Doctrine_Query::create();
                $resulttotal = $query1->select('count(t.idtraza) as total')
                        ->from('Trace t')
                        ->where('t.identidad=? ', array($identidad))
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();
            } else {
                $where = ($post->desde != "") ? "t.usuario ='" . $post->usuario . "' AND t.fecha BETWEEN '" . $post->desde . "' AND '" . $post->hasta . "' AND t.identidad =$identidad" : "t.usuario ='" . $post->usuario . "' AND t.fecha < '" . $post->hasta . "' AND t.identidad =$identidad";
                $query = Doctrine_Query::create();
                $result = $query->select('*')
                        ->from('Trace t')
                        ->where($where)
                        ->offset($start)
                        ->limit($limit)
                        ->orderBy('t.idtraza DESC')
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();

                $query1 = Doctrine_Query::create();
                $resulttotal = $query1->select('count(t.idtraza) as total')
                        ->from('Trace t')
                        ->where($where)
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();
            }
            return array('campos' => $result, 'totalRecords' => $resulttotal[0]['total']);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function deleteTraces($argDate) {
        try {
            $query = Doctrine_Query::create();
            $query->delete()->from('Trace t')->where("t.fecha < $argDate")->execute();
            return 1;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadDataUsuarios() {
        try {
            $Usuarios = new Usuarios();
            return $Usuarios->cargarUsuariosService();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * Carga las funcionlidades accedidas de los ultimos siete dias
     */
    public function loadLastSevenDayFunctionality($fInicio, $fFin) {
        try {
            $where = "t.fecha BETWEEN '" . $fInicio . "' AND '" . $fFin . "'";
            $query = Doctrine_Query::create();
            return $query->select('*')
                            ->from('Trace t')
                            ->where($where)
                            ->orderBy('t.fecha ASC')
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
