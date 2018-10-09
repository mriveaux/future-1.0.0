<?php

class Salario extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Grupoescala', array('local' => 'idgrupoescala', 'foreign' => 'idgrupoescala'));
    }

    public function setTableDefinition() {
        $this->setTableName('estructuraorg.salario');
        $this->hasColumn('idsalario', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'estructuraorg.salario_idsalario'));
        $this->hasColumn('salario', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idgrupoescala', 'character varying', 50, array('notnull' => false, 'primary' => false));
    }

    public function getSalario($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->select('s.*, ge.*')
                    ->from('Salario s')
                    ->innerJoin('s.Grupoescala ge')
                    ->offset($post->start)
                    ->limit($post->limit)
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY);

            $queryCount->from('Salario s')
                    ->setHydrationMode(Doctrine::HYDRATE_RECORD);

            if (isset($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("s.salario ilike '%" . $criterio . "%'");
                $queryCount->addWhere("s.salario ilike '%" . $criterio . "%'");
            }

            $query->addOrderBy('ge.idgrupoescala ASC, s.salario ASC');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

    public function buscarSalario($argSalario, $argIdgrupoescala, $argIdsalario = 0) {
        $query = Doctrine_Query::create();
        $result = $query->select('*')
                ->from('Salario s')
                ->where('s.salario = ? AND s.idgrupoescala = ?', array($argSalario, $argIdgrupoescala))
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();

        if (count($result) > 0) {
            if ($argIdsalario != 0)
                return ($result[0]['idsalario'] == $argIdsalario) ? 0 : 1; // 0-> se puede mod, 1-> no mod
            else
                return 1;
        }
        else
            return 0; // 1-> encontro, 0->no encontro        
    }

    public function isUsed($idSalario) {
        try {
            $sql = "SELECT * from estructuraorg.escalasalarial es WHERE es.idsalario = $idSalario;";
            $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
            $result = $cc->fetchAll($sql);
            if (count($result) > 0) {
                return 1;
            }
            return -1;
        } catch (Doctrine_Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

    public function getGrupoEscala() {
        $sql = "SELECT * from estructuraorg.grupoescala;";
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        return $cc->fetchAll($sql);
    }

    public function getSalarioById($argIdSalario) {
        $query = Doctrine_Query::create();
        $result = $query->select('s.*')
                ->from('Salario s')
                ->where("s.idsalario = $argIdSalario")
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();
        return array('data' => $result);
    }

}
