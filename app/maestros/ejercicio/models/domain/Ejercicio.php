<?php

class Ejercicio extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('maestros.nom_ejercicio');
        $this->hasColumn('idejercicio', 'numeric', 19, array('notnull' => true, 'primary' => true, 'sequence' => 'maestros.nom_ejercicio_idejercicio'));
        $this->hasColumn('ejercicio', 'character varying', 30, array('notnull' => false, 'primary' => false));
        $this->hasColumn('inicio', 'date', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('fin', 'date', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('antecesor', 'numeric', 19, array('notnull' => true, 'primary' => false));
    }

    public function getEjercicios($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Ejercicio e')->offset($post->start)
                    ->limit($post->limit)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Ejercicio e')
                    ->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("e.ejercicio ilike '%" . $criterio . "%'");
                $queryCount->addWhere("e.ejercicio ilike '%" . $criterio . "%'");
            }
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getLastEjercicio() {
        try {
            $query = Doctrine_Query::create();
            $result = $query->select("e.*")
                            ->from('Ejercicio e')->orderby("e.fin DESC")
                            ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)->execute();
            return (count($result) === 0) ? 0 : $result[0];
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getNextEjercicio($idEjercicio) {
        try {
            $query = Doctrine_Query::create();
            $result = $query->select("e.*")
                            ->from('Ejercicio e')->where("e.idejercicio > $idEjercicio")
                            ->orderby("e.ejercicio")
                            ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)->execute();
            return (count($result) === 0) ? 0 : $result[0];
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getEjercicio($idEjercicio) {
        try {
            $query = Doctrine_Query::create();
            $result = $query->select("e.*")
                            ->from('Ejercicio e')->where("e.idejercicio = $idEjercicio")
                            ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)->execute();
            return (count($result) === 0) ? 0 : $result[0];
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
