<?php

class Categoriacliente extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Tiposervicio', array('local' => 'idtiposervicio', 'foreign' => 'idtiposervicio'));
        $this->hasOne('Sector', array('local' => 'idsector', 'foreign' => 'idsector'));
    }

    public function setTableDefinition() {
        $this->setTableName('maestros.nom_categoriacliente');
        $this->hasColumn('idcategoriacliente', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'maestros.nom_categoriacliente_idcategoriacliente'));
        $this->hasColumn('abreviatura', 'character varying', 50, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idsector', 'numeric', 19, array('notnull' => true, 'primary' => false));
        $this->hasColumn('idtiposervicio', 'numeric', 19, array('notnull' => true, 'primary' => false));
    }

    public function loadDataCategoriaclientes($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->select('c.*, s.nombre as sector, t.nombre as tiposervicio')->from('Categoriacliente c')
                    ->innerJoin('c.Sector s')->innerJoin('c.Tiposervicio t')
                    ->offset($post->start)->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Categoriacliente c')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("c.abreviatura ilike '%" . $criterio . "%' OR c.nombre ilike '%" . $criterio . "%'");
                $queryCount->addWhere("c.abreviatura ilike '%" . $criterio . "%' OR c.nombre ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('c.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function buscarNombreCategoriacliente($argAbrev, $argName, $argIdCategoriacliente = 0) {
        try {
            $WHERE = ($argIdCategoriacliente === 0) ? "c.abreviatura='$argAbrev' OR c.nombre = '$argName'" : "(c.abreviatura='$argAbrev' OR c.nombre = '$argName') AND c.idcategoriacliente <> '$argIdCategoriacliente'";
            $query = Doctrine_Query::create();
            $result = $query->select('*')
                    ->from('Categoriacliente c')
                    ->where($WHERE)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            return count($result);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadDataCategoriaclientesService($post) {
        try {
            $query = Doctrine_Query::create();
            $query->from('Categoriacliente c')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("c.abreviatura ilike '%" . $criterio . "%' OR c.nombre ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('c.nombre');
            return $query->execute();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
