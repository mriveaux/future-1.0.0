<?php

class Marcamodelo extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Tipovehiculo', array('local' => 'idtipovehiculo', 'foreign' => 'idtipovehiculo'));
    }

    public function setTableDefinition() {
        $this->setTableName('taller.nom_marcamodelo');
        $this->hasColumn('idmarcamodelo', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'taller.nom_marcamodelo_idmarcamodelo'));
        $this->hasColumn('nombre', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('tipocombustible', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('normaconsumo', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('periodomantenimiento', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idtipovehiculo', 'numeric', null, array('notnull' => false, 'primary' => false));
    }

    public function getMarcamodelo($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->select("m.*, t.*")->from("Marcamodelo m")->innerJoin("m.Tipovehiculo t")->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->select("m.*, tv.*")->from("Marcamodelo m")->innerJoin("m.Tipovehiculo t")->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("m.nombre ilike '%" . $criterio . "%'");
                $queryCount->addWhere("m.nombre ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('m.nombre');

            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Doctrine_Exception $exc) {
            throw $exc;
        }
    }

    public function getMarcamodeloByNombre($nombre, $idmarcamodelo = null) {
        try {
            $WHERE = ($idmarcamodelo) ? "m.nombre = '$nombre' AND m.idmarcamodelo <> '$idmarcamodelo'" : "m.nombre = '$nombre'";
            $query = Doctrine_Query::create();
            $result = $query->select('m.*')
                    ->from('Marcamodelo m')
                    ->where($WHERE)
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();
            return (count($result) > 0) ? 1 : 0; //1-encontro 0-no encont
        } catch (Doctrine_Exception $exc) {
            throw $exc;
        }
    }

    public function getMarcamodeloService() {
        try {
            $query = Doctrine_Query::create();
            $result = $query->select('m.*')
                    ->from('Marcamodelo m')
                    ->orderBy("m.nombre")
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();
            return $result;
        } catch (Doctrine_Exception $exc) {
            throw $exc;
        }
    }

}
