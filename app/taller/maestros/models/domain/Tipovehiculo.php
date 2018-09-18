<?php

class Tipovehiculo extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('taller.nom_tipovehiculo');
        $this->hasColumn('idtipovehiculo', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'taller.nom_tipovehiculo_idtipovehiculo'));
        $this->hasColumn('nombre', 'character varying', 255, array('notnull' => false, 'primary' => false));
    }

    public function getTipovehiculos($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Tipovehiculo t')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Tipovehiculo t')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("t.nombre ilike '%" . $criterio . "%'");
                $queryCount->addWhere("t.nombre ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('t.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getTipovehiculoByNombre($nombre, $idtipovehiculo = null) {
        try {
            $WHERE = ($idtipovehiculo) ? "t.nombre = '$nombre' AND t.idtipovehiculo <> '$idtipovehiculo'" : "t.nombre = '$nombre'";
            $query = Doctrine_Query::create();
            $result = $query->select('t.*')
                    ->from('Tipovehiculo t')
                    ->where($WHERE)
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();
            return (count($result) > 0) ? 1 : 0; //1-encontro 0-no encont
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getTipovehiculoService($agTipo) {
        try {
            $query = Doctrine_Query::create();
            $result = $query->select('t.*')
                    ->from('Tipovehiculo t')
                    ->where('t.idtipovehiculo=?', $agTipo)
                    ->orderBy("t.nombre")
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();
            return $result[0]['nombre'];
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getAllTipovehiculoService() {
        try {
            $query = Doctrine_Query::create();
            $result = $query->select('t.*')
                    ->from('Tipovehiculo t')
                    ->orderBy("t.nombre")
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
