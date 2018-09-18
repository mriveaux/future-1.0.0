<?php

class Nomestructura extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('taller.nom_estructura');
        $this->hasColumn('idestructura', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'taller.nom_estructura_idestructura'));
        $this->hasColumn('abreviatura', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('descripcion', 'character varying', 255, array('notnull' => false, 'primary' => false));
    }

    public function Setup() {
        parent::setUp();
    }

    public function cargarestructura($start, $limit, $cadena) {
        try {
            if ($cadena == '') {
                $query = Doctrine_Query::create();
                $result = $query->select('*')
                        ->from('Nomestructura')
                        ->offset($start)
                        ->limit($limit)
                        ->orderby('nombre')
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();

                $query1 = Doctrine_Query::create();
                $result1 = $query1->select('*')
                        ->from('Nomestructura')
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();
            } else {
                $filtronombre = "n.nombre ILIKE '" . $cadena . "%'";
                $filtroabreviatura = "n.abreviatura ILIKE '" . $cadena . "%'";
                $query = Doctrine_Query::create();
                $result = $query->select('*')
                        ->from('Nomestructura n')
                        ->where($filtronombre . ' OR ' . $filtroabreviatura)
                        ->offset($start)
                        ->limit($limit)
                        ->orderby('nombre')
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();

                $query1 = Doctrine_Query::create();
                $result1 = $query1->select('n.*')
                        ->from('Nomestructura n')
                        ->where($filtronombre . ' OR ' . $filtroabreviatura)
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();
            }

            return array('campos' => $result, 'totalrecords' => count($result1));
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    //busca si existe la estructura(por nombre o abreviatura)
    public function buscarEstructura($nombre, $abrev, $id = 0) {
        try {
            $param[] = $nombre;
            $param[] = $abrev;
            $filtro = 'n.nombre = ? OR n.abreviatura=?';
            $query = Doctrine_Query::create();
            $result = $query->select('*')
                    ->from('Nomestructura n')
                    ->where($filtro, $param)
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();
            if ($id != 0)
                return ($result[0]['idestructura'] == $id) ? 0 : 1; // 0-> se puede mod, 1-> no mod
            return (count($result) > 0) ? 1 : 0; // 1-> encontro, 0->no encontro
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    //se usa desde el emplantillamiento
    public function getAllEstructuraService() {
        try {
            $query = Doctrine_Query::create();
            $result = $query->select('n.*')
                    ->from('Nomestructura n')
                    ->orderby('n.nombre')
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();
            return $result;
        } catch (Doctrine_Exception $exc) {
            throw $exc;
        }
    }

}
