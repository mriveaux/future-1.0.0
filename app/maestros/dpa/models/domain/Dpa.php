<?php

class Dpa extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('maestros.nom_codpa');
        $this->hasColumn('idcodpa', 'numeric', 19, array('notnull' => true, 'primary' => true, 'sequence' => 'maestros.nom_codpa_idcodpa'));
        $this->hasColumn('idpadre', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('denominacion', 'character varying', 255, array('notnull' => true, 'primary' => false));
        $this->hasColumn('idtipodpa', 'numeric', 19, array('notnull' => true, 'primary' => false));
        $this->hasColumn('codigo', 'character varying', 30, array('notnull' => true, 'primary' => false));
        $this->hasColumn('idpais', 'numeric', 19, array('notnull' => true, 'primary' => false));
        $this->hasColumn('estado', 'boolean', 1, array('notnull' => true, 'primary' => false, 'default' => true));
        $this->hasColumn('leaf', 'boolean', 1, array('notnull' => true, 'primary' => false, 'default' => true));
    }

    public function getDpa($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Dpa n')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Dpa n')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("n.dpa ilike '%" . $criterio . "%'");
                $queryCount->addWhere("n.dpa ilike '%" . $criterio . "%'");
            }
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getDpaPais($data) {
        $result = array();
        if (!isset($data->idpais) && strlen($data->idpais) > 0) {
            $idPais = $data->idpais;
            $addWhere = "";
            if (strlen($data->node) > 0 && $data->node != 0) {
                $addWhere = "AND c.idpadre = $data->node AND c.idtipodpa <> $data->node";
            } else {
                $addWhere = "AND c.idpadre isnull";
            }
            if (!isset($data->criterio) && strlen($data->criterio) > 0) {
                $addWhere .= " AND c.denominacion ilike '%$data->criterio%' OR c.codigo ilike '%$data->criterio%'";
            }
            $sql = "SELECT c.idcodpa as id, c.idpadre, c.codigo, c.denominacion as text, c.idtipodpa, c.idpais, c.estado, t.denominacion as tipodpa, c.leaf, d.iddpapais FROM maestros.nom_codpa c INNER JOIN maestros.conf_dpapais d ON (d.idtipodpa = c.idtipodpa) INNER JOIN maestros.nom_tipodpa t ON (d.idtipodpa = t.idtipodpa) WHERE t.fin ISNULL AND d.idpais = $idPais $addWhere ORDER BY c.codigo;";
            $result = Doctrine_Manager::getInstance()->getCurrentConnection()->fetchAll($sql);
        }
        return $result;
    }

    public function getDpaService($data) {
        $result = array();
        if (isset($data->idpais) && strlen($data->idpais) > 0) {
            $idPais = $data->idpais;
            $addWhere = "";
            if (isset($data->node)) {
                if (strlen($data->node) > 0 && $data->node != 0) {
                    $addWhere = "AND c.idpadre = $data->node AND c.idtipodpa <> $data->node";
                } else {
                    $addWhere = "AND c.idpadre isnull";
                }
            }
            if (isset($data->criterio) && strlen($data->criterio) > 0) {
                $addWhere .= " AND c.denominacion ilike '%$data->criterio%' OR c.codigo ilike '%$data->criterio%'";
            }
            $sql = "SELECT c.idcodpa as id, c.idpadre, c.codigo, c.denominacion as text, c.idtipodpa, c.idpais, c.estado, t.denominacion as tipodpa, c.leaf, d.iddpapais FROM maestros.nom_codpa c INNER JOIN maestros.conf_dpapais d ON (d.idtipodpa = c.idtipodpa) INNER JOIN maestros.nom_tipodpa t ON (d.idtipodpa = t.idtipodpa) WHERE t.fin ISNULL AND d.idpais = $idPais $addWhere ORDER BY c.codigo;";
            $result = Doctrine_Manager::getInstance()->getCurrentConnection()->fetchAll($sql);
        }
        return $result;
    }

}