<?php

class Zona extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('maestros.nom_zona');
        $this->hasColumn('idzona', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'maestros.nom_zona_idzona'));
        $this->hasColumn('zona', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('identidad', 'numeric', 19, array('notnull' => false, 'primary' => false));
    }

    public function loadDataZonas($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Zona z')->offset($post->start)
                    ->limit($post->limit)->where("z.identidad = '" . $post->identidad . "'")->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Zona z')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("z.zona ilike '%" . $criterio . "%'");
                $queryCount->addWhere("z.zona ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('z.zona');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getZonaNombre($argName, $argIdCentro, $argIdZona = 0) {
        try {
            $WHERE = ($argIdZona === 0) ? "z.zona='$argName' AND z.identidad= '$argIdCentro'" : "z.zona='$argName' AND z.identidad= '$argIdCentro' AND z.idzona <> '$argIdZona'";
            $query = Doctrine_Query::create();
            $result = $query->select('*')
                    ->from('Zona z')
                    ->where($WHERE)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            return count($result);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
