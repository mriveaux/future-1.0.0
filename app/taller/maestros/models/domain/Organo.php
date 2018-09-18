<?php

class Organo extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('taller.nom_organo');
        $this->hasColumn('idorgano', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'taller.nom_organo_idorgano'));
        $this->hasColumn('nombre', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('descripcion', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('identidad', 'numeric', null, array('notnull' => false, 'primary' => false));
    }

    public function setUp() {
        parent::setUp();
    }

    public function cargarorgano($start = 0, $limit = 0, $cadena = '') {
        $identidad = $_SESSION['identidad'];
        $filtroEntidad = "o.identidad = $identidad";
        if ($cadena == '') {
            $query = Doctrine_Query::create();
            $result = $query->select('*')
                    ->from('Organo o')
                    ->where($filtroEntidad)
                    ->offset($start)
                    ->limit($limit)
                    ->orderby('nombre')
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();

            $query1 = Doctrine_Query::create();
            $result1 = $query1->select('*')
                    ->from('Organo o')
                    ->where($filtroEntidad)
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();
        } else {
            $filtroNomb = "LOWER(o.nombre) LIKE '%" . strtolower($cadena) . "%'";
            $filtroDescrip = "LOWER(o.descripcion) LIKE '%" . strtolower($cadena) . "%'";
            $query = Doctrine_Query::create();
            $result = $query->select('*')
                    ->from('Organo o')
                    ->where($filtroNomb . ' OR ' . $filtroDescrip . ' AND ' . $filtroEntidad)
                    ->offset($start)
                    ->limit($limit)
                    ->orderby('nombre')
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();

            $query1 = Doctrine_Query::create();
            $result1 = $query1->select('*')
                    ->from('Organo o')
                    ->where($filtroNomb . ' OR ' . $filtroDescrip . ' AND ' . $filtroEntidad)
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();
        }

        return array('campos' => $result, 'totalrecords' => count($result1));
    }

    //busca si existe el organo dado el nombre
    public function buscarOrgano($nombre, $idorgano = 0) {
        $query = Doctrine_Query::create();
        $result = $query->select('*')
                ->from('Organo o')
                ->where('o.nombre = ?', array($nombre))
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();
        if (count($result) > 0) {
            if ($idorgano != 0)
                return ($result[0]['idorgano'] == $idorgano) ? 0 : 1; // 0-> se puede mod, 1-> no mod
        }
        else
            return 0; // 1-> encontro, 0->no encontro        
    }

    public function getOrganoService($val = 0) {
        try {
            if ($val == 'estatal') {
                $identidad = $_SESSION['identidad'];
                $query = Doctrine_Query::create();
                $result = $query->select('*')
                        ->from('Organo o')
                        ->where('o.identidad=?', $identidad)
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();
            } else {
                $query = Doctrine_Query::create();
                $result = $query->select('*')
                        ->from('Organo o')
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();
            }
            return $result;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
