<?php

class Trabajador extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('capitalhumano.trabajador');
        $this->hasColumn('idtrabajador', 'numeric', 19, array('notnull' => true, 'primary' => true, 'sequence' => 'capitalhumano.capitalhumano_idtrabajador'));
        $this->hasColumn('apellidos', 'character varying', 255, array('notnull' => true, 'primary' => false));
        $this->hasColumn('cidentidad', 'character varying', 11, array('notnull' => true, 'primary' => false));
        $this->hasColumn('direccion', 'character varying', 255, array('notnull' => true, 'primary' => false));
        $this->hasColumn('fechaentrada', 'date', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('expediente', 'character varying', 30, array('notnull' => true, 'primary' => false));
        $this->hasColumn('militancia', 'character varying', 30, array('notnull' => true, 'primary' => false));
        $this->hasColumn('nivelescolar', 'character varying', 30, array('notnull' => true, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', 30, array('notnull' => true, 'primary' => false));
        $this->hasColumn('ocupacion', 'character varying', 255, array('notnull' => true, 'primary' => false));
        $this->hasColumn('telefono', 'character varying', 255, array('notnull' => true, 'primary' => false));
        $this->hasColumn('identidad', 'numeric', 19, array('notnull' => true, 'primary' => false));
        $this->hasColumn('baja', 'integer', 1, array('notnull' => true, 'primary' => false));
        $this->hasColumn('foto', 'text', null, array('notnull' => false, 'primary' => false));
    }

    public function setUp() {
        parent::setUp();
        $this->hasOne('Bajatrabajador', array('local' => 'idtrabajador', 'foreign' => 'idtrabajador'));
    }
    
    public function cargarTrabajadores($post) {
        try {
            $start = $post->start;
            $limit = $post->limit;
            $cadena = $post->cadena;
            $identidad = $_SESSION['identidad'];
            $select = "idtrabajador, apellidos, cidentidad, direccion, fechaentrada, expediente, militancia, nivelescolar, nombre, ocupacion, telefono, identidad, baja,foto as base64img";
            if ($cadena == '') {
                $query = Doctrine_Query::create();
                $result = $query->select($select)
                        ->from('Trabajador t')
                        ->where('t.identidad=? AND t.baja=?', array($identidad, 0))
                        ->offset($start)
                        ->limit($limit)
                        ->orderby('t.nombre')
                        ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                        ->execute();

                $query1 = Doctrine_Query::create();
                $resulttotal = $query1->select('count(t.idtrabajador) as total')
                        ->from('Trabajador t')
                        ->where('t.identidad=? AND t.baja=?', array($identidad, 0))
                        ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                        ->execute();
            } else {
                $filtronombre = "LOWER(t.nombre) LIKE '" . strtolower($cadena) . "%'";
                $filtroapellidos = "LOWER(t.apellidos) LIKE '" . strtolower($cadena) . "%'";
                $filtroocupacion = "LOWER(t.ocupacion) LIKE '" . strtolower($cadena) . "%'";
                $entidad = "t.identidad =" . $identidad;
                $query = Doctrine_Query::create();
                $result = $query->select($select)
                        ->from('Trabajador t')
                        ->where($filtronombre . ' OR ' . $filtroapellidos . ' OR ' . $filtroocupacion . ' AND ' . $entidad . ' AND t.baja=0')
                        ->offset($start)
                        ->limit($limit)
                        ->orderby('t.nombre')
                        ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                        ->execute();

                $query1 = Doctrine_Query::create();
                $resulttotal = $query1->select('count(t.idtrabajador) as total')
                        ->from('Trabajador t')
                        ->where($filtronombre . ' OR ' . $filtroapellidos . ' OR ' . $filtroocupacion . ' AND ' . $entidad . ' AND t.baja=0')
                        ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                        ->execute();
            }
            return array('campos' => $result, 'totalRecords' => $resulttotal[0]['total']);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function cargarBajas($post, $identidad) {
        try {
            $select = "idtrabajador, apellidos, cidentidad, direccion, fechaentrada, expediente,"
                    . " militancia, nivelescolar, nombre, ocupacion, telefono, identidad, baja, "
                    . "foto as base64img, b.fechabaja as fechabaja, b.motivo as motivo";
            $query = Doctrine_Query::create();
            $query->select($select)->from('Trabajador t')->innerJoin('t.Bajatrabajador b')
                    ->where('t.identidad=? AND t.baja=?', array($identidad, 1))
                    ->offset($post->start)->limit($post->limit)->orderby('t.nombre')
                    ->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->cadena) && strlen($post->cadena) > 0 && $post->cadena != '') {
                $filtronombre = "t.nombre ILIKE '" . strtolower($post->cadena) . "%'";
                $filtroapellidos = "t.apellidos ILIKE '" . strtolower($post->cadena) . "%'";
                $filtroocupacion = "t.ocupacion ILIKE '" . strtolower($post->cadena) . "%'";
                $entidad = "t.identidad =" . $identidad;
                $addWhere = '(' . $filtronombre . ' OR ' . $filtroapellidos . ' OR '
                        . $filtroocupacion . ') AND ' . $entidad . ' AND t.baja = 1';
                $query->addWhere($addWhere);
            }
            $result = $query->setHydrationMode(Doctrine_Core::HYDRATE_RECORD)->execute();
            foreach ($result->toArray() as &$v) {
                $v['estadia'] = $this->tiempoServicio($v['fechaentrada'], $v['fechabaja']);
                $v['fechabaja'] = $this->revertDate($v['fechabaja']);
            }
            return array('campos' => $result->toArray(), 'totalRecords' => $result->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function tiempoServicio($agDateAlta, $agDateBaja) {
        try {
            list($d, $m, $a) = explode('/', $this->revertDate($agDateAlta)); //fecha del cierre de la orden
            list($d1, $m1, $a1) = explode('/', $this->revertDate($agDateBaja)); //fecha actual del sistema
            return round((mktime(0, 0, 0, $m1, $d1, $a1) - mktime(0, 0, 0, $m, $d, $a)) / (60 * 60 * 24));
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

    public function loadDataTrabajadores($identidad = 0) {
        try {
            if (!$identidad)
                $identidad = $_SESSION['identidad'];
//        $where = "t.identidad =" . $identidad . ' AND t.baja <> 1';
            $where = "t.identidad =" . $identidad;
            $query = Doctrine_Query::create();
            $result = $query->select('t.*')
                    ->from('Trabajador t')
                    ->where($where)
                    ->orderby('t.nombre')
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            return ($result) ? $result : array();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    static public function cargarTrabajadoresAll($identidad = 0) {
        try {
            if (!$identidad) {
                $identidad = $_SESSION['identidad'];
            }
            $where = "t.identidad =" . $identidad . ' AND t.baja <> 1';
            $query = Doctrine_Query::create();
            $result = $query->select('t.*')
                            ->from('Trabajador t')->where($where)->orderby('t.nombre')
                            ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)->execute();
            $data_response = array();
            foreach ($result as $value) {
                $data = new stdClass();
                $data->idtrabajador = $value['idtrabajador'];
                $data->nombre = $value['nombre'] . ' ' . $value['apellidos'];
                $data_response[] = $data;
            }
            return $data_response;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
