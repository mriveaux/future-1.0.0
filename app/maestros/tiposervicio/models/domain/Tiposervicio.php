<?php

class Tiposervicio extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('maestros.nom_tiposervicio');
        $this->hasColumn('idtiposervicio', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'maestros.nom_tiposervicio_idtiposervicio'));
        $this->hasColumn('abreviatura', 'character varying', 50, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', 255, array('notnull' => false, 'primary' => false));
    }

    public function loadDataTiposervicios($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Tiposervicio t')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Tiposervicio t')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("t.abreviatura ilike '%" . $criterio . "%' OR t.nombre ilike '%" . $criterio . "%'");
                $queryCount->addWhere("t.abreviatura ilike '%" . $criterio . "%' OR t.nombre ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('t.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function buscarNombreTiposervicio($argAbrev, $argName, $argIdTiposervicio = 0) {
        try {
            $WHERE = ($argIdTiposervicio === 0) ? "t.abreviatura='$argAbrev' OR t.nombre = '$argName'" : "(t.abreviatura='$argAbrev' OR t.nombre = '$argName') AND t.idtiposervicio <> '$argIdTiposervicio'";
            $query = Doctrine_Query::create();
            $result = $query->select('*')
                    ->from('Tiposervicio t')
                    ->where($WHERE)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            return count($result);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadDataTiposervicioService($post) {
        try {
            $query = Doctrine_Query::create();
            $query->from('Tiposervicio t')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("t.abreviatura ilike '%" . $criterio . "%' OR t.nombre ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('t.nombre');
            return $query->execute();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
