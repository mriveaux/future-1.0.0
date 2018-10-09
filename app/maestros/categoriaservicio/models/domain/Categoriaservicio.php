<?php

class Categoriaservicio extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('maestros.nom_categoriaservicio');
        $this->hasColumn('idcategoriaservicio', 'numeric', 19, array('notnull' => true, 'primary' => true, 'sequence' => 'maestros.nom_categoriaservicio_idcategoriaservicio'));
        $this->hasColumn('prioridad', 'numeric', 2, array('notnull' => true));
        $this->hasColumn('abreviatura', 'character varying', 50, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('color', 'character varying', 50, array('notnull' => false, 'primary' => false));
    }

    public function loadDataCategoriaservicios($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Categoriaservicio c')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Categoriaservicio c')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("c.abreviatura ilike '%" . $criterio . "%' OR c.nombre ilike '%" . $criterio . "%'");
                $queryCount->addWhere("c.abreviatura ilike '%" . $criterio . "%' OR c.nombre ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('c.prioridad, c.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function buscarNombreCategoriaservicio($argAbrev, $argName, $argIdCategoriaservicio = 0) {
        try {
            $WHERE = ($argIdCategoriaservicio === 0) ? "c.abreviatura='$argAbrev' OR c.nombre = '$argName'" : "(c.abreviatura='$argAbrev' OR c.nombre = '$argName') AND c.idcategoriaservicio <> '$argIdCategoriaservicio'";
            $query = Doctrine_Query::create();
            $result = $query->select('*')
                    ->from('Categoriaservicio c')
                    ->where($WHERE)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            return count($result);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadDataCategoriaserviciosService($post) {
        try {
            $query = Doctrine_Query::create();
            $query->from('Categoriaservicio c')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("c.abreviatura ilike '%" . $criterio . "%' OR c.nombre ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('c.prioridad, c.nombre');
            return $query->execute();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
