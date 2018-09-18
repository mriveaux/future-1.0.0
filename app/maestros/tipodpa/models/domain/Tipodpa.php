<?php

class Tipodpa extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('maestros.nom_tipodpa');
        $this->hasColumn('idtipodpa', 'numeric', 19, array('notnull' => true, 'primary' => true, 'sequence' => 'maestros.nom_tipodpa_idtipodpa'));
        $this->hasColumn('denominacion', 'character varying', 255, array('notnull' => true, 'primary' => false));
        $this->hasColumn('inicio', 'date', 10, array('notnull' => true, 'primary' => false));
        $this->hasColumn('fin', 'date', 10, array('notnull' => false, 'primary' => false));
    }

    public function getTipodpas($data) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->select('td.*, (case when td.fin isnull then 1 else 2 end) as estado')
                    ->from('Tipodpa td')->offset($data->start)
                    ->limit($data->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Tipodpa td')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($data->criterio) && strlen($data->criterio) > 0) {
                $criterio = $data->criterio;
                $query->addWhere("td.denominacion ilike '%" . $criterio . "%'");
                $queryCount->addWhere("td.denominacion ilike '%" . $criterio . "%'");
            }
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }
    
    public function getTipodpasService($data) {
        try {
            $sql = "SELECT t.idtipodpa, t.denominacion, t.inicio, t.fin, "
                    . "(CASE WHEN t.fin isnull THEN 1 ELSE 2 END) AS estado "
                    . "FROM maestros.nom_tipodpa t INNER JOIN maestros.conf_dpapais "
                    . "d ON t.idtipodpa = d.idtipodpa WHERE d.idpais = $data->idpais;";
            if (isset($data->criterio) && strlen($data->criterio) > 0) {
                $criterio = $data->criterio;
                $sql .= "t.denominacion ilike '%" . $criterio . "%'";
            }
            $result = Doctrine_Manager::getInstance()->getCurrentConnection()->fetchAll($sql);
            return ['data' => $result];
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
