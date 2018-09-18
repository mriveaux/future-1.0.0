<?php

class Actividad extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('taller.nom_actividad');
        $this->hasColumn('idactividad', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'taller.nom_actividad_idactividad'));
        $this->hasColumn('nombre', 'character varying', 100, array('notnull' => true, 'primary' => false));
        $this->hasColumn('abreviatura', 'character varying', 50, array('notnull' => true, 'primary' => false));
        $this->hasColumn('descripcion', 'character varying', 255, array('notnull' => true, 'primary' => false));
    }

    public function getActividades($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Actividad a')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Actividad a')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("a.nombre ilike '%" . $criterio . "%' OR a.abreviatura ilike '%" . $criterio . "%' OR a.descripcion ilike '%" . $criterio . "%'");
                $queryCount->addWhere("a.nombre ilike '%" . $criterio . "%' OR a.abreviatura ilike '%" . $criterio . "%' OR a.descripcion ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('a.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getActividadByNombre($nombre, $idactividad = null) {
        try {
            $WHERE = ($idactividad) ? "a.nombre = '$nombre' AND a.idactividad <> '$idactividad'" : "a.nombre = '$nombre'";
            $query = Doctrine_Query::create();
            $result = $query->select('a.*')
                    ->from('Actividad a')
                    ->where($WHERE)
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();
            return (count($result) > 0) ? 1 : 0; //1-encontro 0-no encont
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getActividadService() {
        try {
            $query = Doctrine_Query::create();
            $result = $query->select('*')
                    ->from('Actividad a')
                    ->orderBy("a.nombre")
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();
            return array('data' => $result);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
