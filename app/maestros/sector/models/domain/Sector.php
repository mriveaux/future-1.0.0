<?php

class Sector extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('maestros.nom_sector');
        $this->hasColumn('idsector', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'maestros.nom_sector_idsector'));
        $this->hasColumn('abreviatura', 'character varying', 50, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', 255, array('notnull' => false, 'primary' => false));
    }

    public function loadDataSectores($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Sector s')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Sector s')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("s.abreviatura ilike '%" . $criterio . "%' OR s.nombre ilike '%" . $criterio . "%'");
                $queryCount->addWhere("s.abreviatura ilike '%" . $criterio . "%' OR s.nombre ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('s.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function buscarNombreSector($argAbrev, $argName, $argIdSector = 0) {
        try {
            $WHERE = ($argIdSector === 0) ? "s.abreviatura='$argAbrev' OR s.nombre = '$argName'" : "(s.abreviatura='$argAbrev' OR s.nombre = '$argName') AND s.idsector <> '$argIdSector'";
            $query = Doctrine_Query::create();
            $result = $query->select('*')
                    ->from('Sector s')
                    ->where($WHERE)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            return count($result);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadDataSectorService($post) {
        try {
            $query = Doctrine_Query::create();
            $query->from('Sector s')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("s.abreviatura ilike '%" . $criterio . "%' OR s.nombre ilike '%" . $criterio . "%'");
            }
            return $query->execute();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
