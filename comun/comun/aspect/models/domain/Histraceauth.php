<?php

class Histraceauth extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Histrace', array('local' => 'usuario', 'foreign' => 'usuario'));
    }

    public function setTableDefinition() {
        $this->setTableName('traza.his_trazaauth');
        $this->hasColumn('idhistraza', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'traza.his_trazaauth_idhistraza'));
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

    public function loadDetllesAuth($post) {
        try {
            $start = $post->start;
            $limit = $post->limit;
            if (!isset($post->usuario) || $post->usuario == '') {
                $query = Doctrine_Query::create();
                $result = $query->select('*')
                        ->from('Histraceauth hta')
                        ->offset($start)
                        ->limit($limit)
                        ->orderBy('hta.idhistraza DESC')
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();

                $query1 = Doctrine_Query::create();
                $resulttotal = $query1->select('count(hta.idhistraza) as total')
                        ->from('Histraceauth hta')
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();
            } else {
                $where = ($post->desde != "") ? "hta.usuario ='" . $post->usuario . "' AND hta.fecha BETWEEN '" . $post->desde . "' AND '" . $post->hasta . "'" : "hta.usuario ='" . $post->usuario . "' AND hta.fecha < '" . $post->hasta . "'";
                $query = Doctrine_Query::create();
                $result = $query->select('*')
                        ->from('Histraceauth hta')
                        ->where($where)
                        ->offset($start)
                        ->limit($limit)
                        ->orderBy('hta.idhistraza DESC')
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();

                $query1 = Doctrine_Query::create();
                $resulttotal = $query1->select('count(hta.idhistraza) as total')
                        ->from('Histraceauth hta')
                        ->where($where)
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();
            }
            return array('campos' => $result, 'totalRecords' => $resulttotal[0]['total']);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function deleteHisTracesAuth($argDate) {
        try {
            $query = Doctrine_Query::create();
            $query->delete()->from('Histraceauth hta')->where("hta.fecha < $argDate")->execute();
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
            $where = "hta.fecha BETWEEN '" . $fInicio . "' AND '" . $fFin . "'";
            $query = Doctrine_Query::create();
            return $query->select('*')
                            ->from('Histraceauth hta')
                            ->where($where)
                            ->orderBy('hta.fecha ASC')
                            ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                            ->execute();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadUsersAccess($fInicio, $fFin) {
        try {
            $where = "hta.fecha BETWEEN '" . $fInicio . "' AND '" . $fFin . "'";
            $query = Doctrine_Query::create();
            return $query->select('*')
                            ->from('Histraceauth hta')
                            ->where($where)
                            ->orderBy('hta.fecha ASC')
                            ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                            ->execute();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadUsersAccessWrong($fInicio, $fFin) {
        try {
            $where = "hta.usuario = 'WRONG' AND hta.fecha BETWEEN '" . $fInicio . "' AND '" . $fFin . "'";
            $query = Doctrine_Query::create();
            return $query->select('*')
                            ->from('Histraceauth hta')
                            ->where($where)
                            ->orderBy('hta.fecha ASC')
                            ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                            ->execute();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadUsersAccessByEntity($fInicio, $fFin, $arrUsers) {
        try {
            $WHERE = "ht.fecha BETWEEN '" . $fInicio . "' AND '" . $fFin . "'";
            if (count($arrUsers) > 1) {
                $arr = [];
                foreach ($arrUsers as $k => $v) {
                    $arr[] = "'$v'";
                }
                $WHERE_U = implode(',', $arr);
                $WHERE_USERS = "ht.usuario IN ($WHERE_U)";
            } else {
                $WHERE_USERS = "ht.usuario = '$WHERE_USERS[0]'";
            }
            $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
            $SQL = "SELECT distinct ht.usuario, count(ht.usuario) as cantidad, e.abreviatura as entidad FROM estructuraorg.entidades e"
                    . " INNER JOIN traza.his_traza ht ON ht.identidad = e.identidad"
                    . " WHERE $WHERE_USERS AND $WHERE GROUP BY ht.usuario, e.abreviatura";
            return $cc->fetchAll($SQL);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
