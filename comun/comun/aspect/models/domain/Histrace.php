<?php

class Histrace extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Entidades', array('local' => 'identidad', 'foreign' => 'identidad'));
    }

    public function setTableDefinition() {
        $this->setTableName('traza.his_traza');
        $this->hasColumn('idhistraza', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'traza.his_traza_idhistraza'));
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

    public function loadDetllesTraza($post, $identidad) {
        try {
            $start = $post->start;
            $limit = $post->limit;
            if (!isset($post->usuario) || $post->usuario == '') {
                $query = Doctrine_Query::create();
                $result = $query->select('*')
                        ->from('Histrace ht')
                        ->where('ht.identidad=? ', array($identidad))
                        ->offset($start)
                        ->limit($limit)
                        ->orderBy('ht.idhistraza DESC')
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();

                $query1 = Doctrine_Query::create();
                $resulttotal = $query1->select('count(ht.idhistraza) as total')
                        ->from('Histrace ht')
                        ->where('ht.identidad=? ', array($identidad))
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();
            } else {
                $where = ($post->desde != "") ? "ht.usuario ='" . $post->usuario . "' AND ht.fecha BETWEEN '" . $post->desde . "' AND '" . $post->hasta . "' AND ht.identidad =$identidad" : "ht.usuario ='" . $post->usuario . "' AND ht.fecha < '" . $post->hasta . "' AND ht.identidad =$identidad";
                $query = Doctrine_Query::create();
                $result = $query->select('*')
                        ->from('Histrace ht')
                        ->where($where)
                        ->offset($start)
                        ->limit($limit)
                        ->orderBy('ht.idhistraza DESC')
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();

                $query1 = Doctrine_Query::create();
                $resulttotal = $query1->select('count(ht.idhistraza) as total')
                        ->from('Histrace ht')
                        ->where($where)
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();
            }
            return array('campos' => $result, 'totalRecords' => $resulttotal[0]['total']);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function deleteHisTraces($argDate) {
        try {
            $query = Doctrine_Query::create();
            $query->delete()->from('Histrace ht')->where("ht.fecha < $argDate")->execute();
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

    public function loadLastSevenDayFunctionality($fInicio, $fFin) {
        try {
            $where = "ht.fecha BETWEEN '" . $fInicio . "' AND '" . $fFin . "'";
            $query = Doctrine_Query::create();
            return $query->select('*')
                            ->from('Histrace ht')
                            ->where($where)
                            ->orderBy('ht.fecha ASC')
                            ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                            ->execute();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
