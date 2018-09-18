<?php

class Pais extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('maestros.nom_pais');
        $this->hasColumn('idpais', 'numeric', 19, array('notnull' => false, 'primary' => true, 'sequence' => 'maestros.nom_pais_idpais'));
        $this->hasColumn('codigo', 'numeric', 3, array('notnull' => false, 'primary' => false));
        $this->hasColumn('siglas', 'character varying', 20, array('notnull' => false, 'primary' => false));
        $this->hasColumn('pais', 'character varying', 100, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nacionalidad', 'character varying', 100, array('notnull' => false, 'primary' => false));
    }

    public function getPaises($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Pais p')->orderBy('p.pais')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Pais p')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->_request['criterio']) && strlen($post->_request['criterio']) > 0) {
                $criterio = $post->_request['criterio'];
                $query->addWhere("p.siglas ilike '%" . $criterio . "%' OR p.pais ilike '%" . $criterio . "%'");
                $queryCount->addWhere("p.siglas ilike '%" . $criterio . "%' OR p.pais ilike '%" . $criterio . "%'");
            }
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getListPaisesService($data = null) {
        try {
            $query = Doctrine_Query::create();
            $query->from('Pais p')->orderBy('p.pais')->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            if ($data != null && strlen($data->criterio) > 0) {
                $criterio = $data->criterio;
                $query->addWhere("p.siglas ilike '%" . $criterio . "%' OR p.pais ilike '%" . $criterio . "%'");
            }
            $result = $query->execute();
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getPaisConfDpa($data) {
        $idPais = $data->idpais;
        $addWhere = "";
        if (strlen($data->node) > 0) {
            $addWhere = " AND d.idpadre = $data->node AND d.idtipodpa <> $data->node";
        } else {
            $addWhere = " AND (d.idpadre = t.idtipodpa)";
        }
        $sql = "SELECT d.iddpapais AS id, d.idpais, d.idtipodpa, d.idpadre, d.leaf, t.denominacion as text, t.fin, t.inicio "
                . "FROM maestros.conf_dpapais d INNER JOIN maestros.nom_tipodpa t ON (d.idtipodpa = t.idtipodpa)"
                . " WHERE t.fin ISNULL AND d.idpais = $idPais $addWhere;";
        $result = Doctrine_Manager::getInstance()->getCurrentConnection()->fetchAll($sql);
        return $result;
    }

}
