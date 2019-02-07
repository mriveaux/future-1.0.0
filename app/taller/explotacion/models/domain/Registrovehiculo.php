<?php

class Registrovehiculo extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Marcamodelo', array('local' => 'idmarcamodelo', 'foreign' => 'idmarcamodelo'));
        $this->hasOne('Tipovehiculo', array('local' => 'idtipovehiculo', 'foreign' => 'idtipovehiculo'));
        $this->hasOne('Tipovehiculo', array('local' => 'tipofisico', 'foreign' => 'idtipovehiculo'));
        $this->hasOne('Organo', array('local' => 'idorgano', 'foreign' => 'idorgano'));
        $this->hasOne('Grupoexplotacion', array('local' => 'idgrupoexplotacion', 'foreign' => 'idgrupoexplotacion'));
        $this->hasOne('Color', array('local' => 'idcolor', 'foreign' => 'idcolor'));
        $this->hasOne('Nomestructura', array('local' => 'idestructura', 'foreign' => 'idestructura'));
        $this->hasOne('Bajavehiculo', array('local' => 'idregistrovehiculo', 'foreign' => 'idregistrovehiculo'));
        $this->hasMany('Planmantenimiento', array('local' => 'idregistrovehiculo', 'foreign' => 'idregistrovehiculo'));
        $this->hasMany('Vehiculo', array('local' => 'idregistrovehiculo', 'foreign' => 'idvehiculo'));
    }

    public function setTableDefinition() {
        $this->setTableName('taller.dat_registrovehiculo');
        $this->hasColumn('idregistrovehiculo', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'taller.dat_registrovehiculo_idregistrovehiculo'));
        $this->hasColumn('anno', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('colorsecundario', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fecha', 'date', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idcolor', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idgrupoexplotacion', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idmarcamodelo', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idorgano', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idtipovehiculo', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nochassis', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nocirculacion', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nomatricula', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nomotor', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('novin', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('observaciones', 'character varying', 1000, array('notnull' => false, 'primary' => false));
        $this->hasColumn('serie', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('tipofisico', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idestructura', 'numeric', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('baja', 'numeric', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('identidad', 'numeric', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('foto', 'text', null, array('notnull' => false, 'primary' => false));
    }

    public function getRegistrovehiculo($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $cond = "rv.identidad =" . $_SESSION['identidad'] . " AND rv.baja = 0";
            $query->select('rv.*, m.nombre, c.nombre, o.nombre, g.nombre, t.nombre, ne.nombre')
                    ->from('Registrovehiculo rv')
                    ->leftjoin('rv.Marcamodelo m, rv.Color c, rv.Organo o, rv.Grupoexplotacion g, rv.Tipovehiculo t, rv.Nomestructura ne')
                    ->where($cond)
                    ->offset($post->start)->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->select('count(rv.idregistrovehiculo) as total')
                    ->from('Registrovehiculo rv')
                    ->leftjoin('rv.Marcamodelo m, rv.Color c, rv.Organo o,rv.Grupoexplotacion g, rv.Tipovehiculo t, rv.Nomestructura ne')
                    ->where($cond)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $filtrotipo = "t.nombre ILIKE '%" . $post->criterio . "%'";
                $filtromarca = "m.nombre ILIKE '%" . $post->criterio . "%'";
                $filtromatricula = "rv.nomatricula ILIKE '%" . $post->criterio . "%'";
                $filtroorgano = "o.nombre ILIKE '%" . $post->criterio . "%'";
                $filtrogrupo = "g.nombre ILIKE '%" . $post->criterio . "%'";
                $query->addWhere("(" . $filtrotipo . ' OR ' . $filtromarca . ' OR ' . $filtromatricula . ' OR ' . $filtroorgano . ' OR ' . $filtrogrupo . ")");
                $queryCount->addWhere("(" . $filtrotipo . ' OR ' . $filtromarca . ' OR ' . $filtromatricula . ' OR ' . $filtroorgano . ' OR ' . $filtrogrupo . ")");
            }
            $objcolor = new Color();
            $objtipo = new Tipovehiculo();
            $query->addOrderBy('m.nombre,rv.nomatricula');
            $result = $query->execute();
            $count = $queryCount->execute();
            $data_return = array();
            if (count($result) > 0) {
                foreach ($result as $value) {
                    $response = new stdClass();
                    $response->idregistrovehiculo = $value['idregistrovehiculo'];
                    $response->idcolorsecundario = $value['colorsecundario'];
                    $response->colorsecundario = $objcolor->searchColorService($value['colorsecundario']);
                    $response->idcolor = $value['idcolor'];
                    $response->idgrupoexplotacion = $value['idgrupoexplotacion'];
                    $response->idmarcamodelo = $value['idmarcamodelo'];
                    $response->idorgano = $value['idorgano'];
                    $response->idtipovehiculo = $value['idtipovehiculo'];
                    $response->tipovehiculo = $objtipo->getTipovehiculoService($value['idtipovehiculo']);
                    $response->idtipofisico = $value['tipofisico'];
                    $response->descorgano = $value['Organo']['nombre'];
                    $response->descgrupoexplotacion = $value['Grupoexplotacion']['nombre'];
                    $response->fecha = $value['fecha'];
                    $response->desctipovehiculo = $value['Tipovehiculo']['nombre'];
                    $response->descmarcamodelo = $value['Marcamodelo']['nombre'];
                    $response->anno = $value['anno'];
                    $response->serie = $value['serie'];
                    $response->desccolor = $value['Color']['nombre'];
                    $response->nomatricula = $value['nomatricula'];
                    $response->nochassis = $value['nochassis'];
                    $response->nomotor = $value['nomotor'];
                    $response->nocirculacion = $value['nocirculacion'];
                    $response->novin = $value['novin'];
                    $response->idestructura = $value['Nomestructura']['idestructura'];
                    $response->denominacionestruc = $value['Nomestructura']['nombre'];
                    $response->observaciones = $value['observaciones'];
                    $response->baja = $value['baja'];
                    $response->base64img = $value['foto'];
                    $data_return[] = $response;
                }
            }
            return array('data' => $data_return, 'total' => $count[0]['total']);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getRegistrovehiculoService($post) {
        try {
            $query = Doctrine_Query::create();
            $cond = "rv.identidad =" . $_SESSION['identidad'] . " AND rv.baja = 0";
            $query->select('rv.*, m.nombre, c.nombre, o.nombre, g.nombre, t.nombre, ne.nombre')
                ->from('Registrovehiculo rv')
                ->leftjoin('rv.Marcamodelo m, rv.Color c, rv.Organo o, rv.Grupoexplotacion g, rv.Tipovehiculo t, rv.Nomestructura ne')
                ->where($cond)
                ->offset($post->start)->limit($post->limit);
//            $query->addOrderBy('rv.nomatricula');
            $query->addOrderBy('m.nombre,rv.nomatricula');

            $result = $query->setHydrationMode(Doctrine_Core::HYDRATE_RECORD)->execute();
            $count = $result->count();
            return array('data' => $result->toArray(), 'total' => $count);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getRegistroBajas($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $cond = "rv.identidad =" . $_SESSION['identidad'];
            $query->select('rv.*, m.nombre, c.nombre, o.nombre, g.nombre, t.nombre, ne.nombre, bv.*')
                    ->from('Registrovehiculo rv')
                    ->innerjoin('rv.Bajavehiculo bv')
                    ->leftjoin('rv.Marcamodelo m, rv.Color c, rv.Organo o, rv.Grupoexplotacion g, rv.Tipovehiculo t, rv.Nomestructura ne')
                    ->where($cond)
                    ->offset($post->start)->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->select('count(rv.idregistrovehiculo) as total')
                    ->from('Registrovehiculo rv')
                    ->innerjoin('rv.Bajavehiculo bv')
                    ->leftjoin('rv.Marcamodelo m, rv.Color c, rv.Organo o, rv.Grupoexplotacion g, rv.Tipovehiculo t, rv.Nomestructura ne')
                    ->where($cond)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $filtrotipo = "t.nombre ILIKE '%" . $post->criterio . "%'";
                $filtromarca = "m.nombre ILIKE '%" . $post->criterio . "%'";
                $filtromatricula = "rv.nomatricula ILIKE '%" . $post->criterio . "%'";
                $filtroorgano = "o.nombre ILIKE '%" . $post->criterio . "%'";
                $filtrogrupo = "g.nombre ILIKE '%" . $post->criterio . "%'";
                $query->addWhere("(" . $filtrotipo . ' OR ' . $filtromarca . ' OR ' . $filtromatricula . ' OR ' . $filtroorgano . ' OR ' . $filtrogrupo . ")");
                $queryCount->addWhere("(" . $filtrotipo . ' OR ' . $filtromarca . ' OR ' . $filtromatricula . ' OR ' . $filtroorgano . ' OR ' . $filtrogrupo . ")");
            }
            $objcolor = new Color();
            $objtipo = new Tipovehiculo();
            $query->addOrderBy('m.nombre,rv.nomatricula');
            $result = $query->execute();
            $count = $queryCount->execute();
            $data_return = array();
            if (count($result) > 0) {
                foreach ($result as $value) {
                    $response = new stdClass();
                    $response->idregistrovehiculo = $value['idregistrovehiculo'];
                    $response->idcolorsecundario = $value['colorsecundario'];
                    $response->colorsecundario = $objcolor->searchColorService($value['colorsecundario']);
                    $response->idcolor = $value['idcolor'];
                    $response->idgrupoexplotacion = $value['idgrupoexplotacion'];
                    $response->idmarcamodelo = $value['idmarcamodelo'];
                    $response->idorgano = $value['idorgano'];
                    $response->idtipovehiculo = $value['idtipovehiculo'];
                    $response->tipovehiculo = $objtipo->getTipovehiculoService($value['idtipovehiculo']);
                    $response->idtipofisico = $value['tipofisico'];
                    $response->descorgano = $value['Organo']['nombre'];
                    $response->descgrupoexplotacion = $value['Grupoexplotacion']['nombre'];
                    $response->fecha = $value['fecha'];
                    $response->desctipovehiculo = $value['Tipovehiculo']['nombre'];
                    $response->descmarcamodelo = $value['Marcamodelo']['nombre'];
                    $response->anno = $value['anno'];
                    $response->serie = $value['serie'];
                    $response->desccolor = $value['Color']['nombre'];
                    $response->nomatricula = $value['nomatricula'];
                    $response->nochassis = $value['nochassis'];
                    $response->nomotor = $value['nomotor'];
                    $response->nocirculacion = $value['nocirculacion'];
                    $response->novin = $value['novin'];
                    $response->idestructura = $value['Nomestructura']['idestructura'];
                    $response->denominacionestruc = $value['Nomestructura']['nombre'];
                    $response->observaciones = $value['observaciones'];
                    $response->baja = $value['baja'];
//                    $response->base64img = $value['foto'];
                    $response->idbajavehiculo = $value['Bajavehiculo']['idbajavehiculo'];
                    $response->fechaorden = $value['Bajavehiculo']['fechaorden'];
                    $response->numeroorden = $value['Bajavehiculo']['numeroorden'];
                    $response->motivo = $value['Bajavehiculo']['motivo'];
                    $response->numeroentrega = $value['Bajavehiculo']['numeroentrega'];
                    $response->fechaentrega = $value['Bajavehiculo']['fechaentrega'];
                    $response->destino = $value['Bajavehiculo']['destino'];
                    $data_return[] = $response;
                }
            }
            return array('data' => $data_return, 'total' => $count[0]['total']);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadDataPrintExpedientes($condition, $arr_org) {
        $str_idorgano = implode(',', $arr_org);
        $select = "rv.*, m.nombre, c.nombre, o.nombre, g.nombre, t.nombre, ne.*";
        $join = "rv.Marcamodelo m, rv.Color c,rv.Organo o, rv.Grupoexplotacion g, rv.Tipovehiculo t, rv.Nomestructura ne";
//        $where = "rv.identidad =" . $_SESSION['identidad'] . " AND rv.idorgano IN ($str_idorgano)"; //default TODOS
        $where = "rv.identidad =" . $_SESSION['identidad']; //Hasta definir que hago con el organo
        $query = Doctrine_Query::create();
        if ($condition == 3) {//solo ACTIVOS
            $where = $where . " AND rv.baja=0";
            $query->select($select)
                    ->from('Registrovehiculo rv')
                    ->leftjoin($join)
                    ->where($where)
                    ->orderby('m.nombre,rv.nomatricula')->setHydrationMode(Doctrine::HYDRATE_ARRAY);
        } else if ($condition == 4) {//solo BAJAS
            $select = $select . ", bv.*";
            $where = $where . " AND rv.baja=1";
            $query->select($select)
                    ->from('Registrovehiculo rv')
                    ->innerjoin('rv.Bajavehiculo bv')
                    ->leftjoin($join)
                    ->where($where)
                    ->orderby('m.nombre,rv.nomatricula')->setHydrationMode(Doctrine::HYDRATE_ARRAY);
        } else {
            $query = Doctrine_Query::create();
            $query->select($select)
                    ->from('Registrovehiculo rv')
                    ->leftjoin($join)
                    ->where($where)
                    ->orderby('m.nombre,rv.nomatricula')->setHydrationMode(Doctrine::HYDRATE_ARRAY);
        }

        $result = $query->execute();

        $data_return = array();
        if (count($result) > 0) {
            $objcolor = new Color();
            $objtipo = new Tipovehiculo();
            foreach ($result as $value) {
                $response = new stdClass();
                $response->colorsecundario = $objcolor->searchColorService($value['colorsecundario']);
                $response->tipovehiculo = $objtipo->getTipovehiculoService($value['idtipovehiculo']);
                $response->descorgano = $value['Organo']['nombre'];
                $response->descgrupoexplotacion = $value['Grupoexplotacion']['nombre'];
                $response->fecha = $value['fecha'];
                $response->desctipovehiculo = $value['Tipovehiculo']['nombre'];
                $response->descmarcamodelo = $value['Marcamodelo']['nombre'];
                $response->anno = $value['anno'];
                $response->serie = $value['serie'];
                $response->desccolor = $value['Color']['nombre'];
                $response->nomatricula = $value['nomatricula'];
                $response->nochassis = $value['nochassis'];
                $response->nomotor = $value['nomotor'];
                $response->nocirculacion = $value['nocirculacion'];
                $response->novin = $value['novin'];
                $response->abreviatura = $value['Nomestructura']['abreviatura'];
                $response->denominacionestruc = $value['Nomestructura']['nombre'];
                $response->observaciones = $value['observaciones'];
                $response->baja = $value['baja'];
                if ($condition == 4) {
//                    $response->baja_fechaorden = $value['Bajavehiculo']['fechaorden'];
                    $response->baja_fechaorden = implode('/', array_reverse(explode('-', $value['Bajavehiculo']['fechaorden'])));
                    $response->baja_numeroorden = $value['Bajavehiculo']['numeroorden'];
                    $response->baja_motivo = $value['Bajavehiculo']['motivo'];
                    $response->baja_numeroentrega = $value['Bajavehiculo']['numeroentrega'];
//                    $response->baja_fechaentrega = $value['Bajavehiculo']['fechaentrega'];
                    $response->baja_fechaentrega = implode('/', array_reverse(explode('-', $value['Bajavehiculo']['fechaentrega'])));
                    $response->baja_destino = $value['Bajavehiculo']['destino'];
                }
//                $response->base64img = $value['foto'];
                $data_return[] = $response;
            }
        }
        return $data_return;
    }

}
