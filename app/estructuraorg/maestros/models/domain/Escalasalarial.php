<?php

class Escalasalarial extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Tipoescala', array('local' => 'idtipoescala', 'foreign' => 'idtipoescala'));
        $this->hasOne('Grupoescala', array('local' => 'idgrupoescala', 'foreign' => 'idgrupoescala'));
        $this->hasOne('Salario', array('local' => 'idsalario', 'foreign' => 'idsalario'));
    }

    public function setTableDefinition() {
        $this->setTableName('estructuraorg.escalasalarial');
        $this->hasColumn('idescalasalarial', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'estructuraorg.escalasalarial_idescalasalarial'));
        $this->hasColumn('idtipoescala', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idgrupoescala', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idsalario', 'numeric', 19, array('notnull' => false, 'primary' => false));
    }

    public function getEscalasalarial($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->select('es.*, te.*, ge.*, s.*')
                    ->from('Escalasalarial es')
                    ->innerJoin('es.Tipoescala te')
                    ->innerJoin('es.Grupoescala ge')
                    ->innerJoin('es.Salario s')
                    ->offset($post->start)
                    ->limit($post->limit)
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY);

            $queryCount->from('Escalasalarial es')
                    ->setHydrationMode(Doctrine::HYDRATE_RECORD);

            if (isset($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("es.idescalasalarial ilike '%" . $criterio . "%'");
                $queryCount->addWhere("es.idescalasalarial ilike '%" . $criterio . "%'");
            }

            $query->addOrderBy('ge.idgrupoescala ASC');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

    public function buscarEscalasalarial($argTipoescala, $argIdgrupoescala, $argSalario, $argIdescalasalarial = 0) {
        $query = Doctrine_Query::create();
        $result = $query->select('*')
                ->from('Escalasalarial es')
                ->where('es.idtipoescala = ? AND es.idgrupoescala = ? AND es.idsalario = ?', array($argTipoescala, $argIdgrupoescala, $argSalario))
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();

        if (count($result) > 0) {
            if ($argIdescalasalarial != 0)
                return ($result[0]['idescalasalarial'] == $argIdescalasalarial) ? 0 : 1; // 0-> se puede mod, 1-> no mod
            else
                return 1;
        }
        else
            return 0; // 1-> encontro, 0->no encontro        
    }

    //hasta que se implemente capital humano devuelve false
    public function isUsed($idEscalasalarial) {
        try {
//            $sql = "SELECT * from estructuraorg.escalasalarial es WHERE es.idescalasalarial = $idEscalasalarial;";
//            $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
//            $result = $cc->fetchAll($sql);
//            if (count($result) > 0) {
//                return 1;
//            }
            return -1;
        } catch (Doctrine_Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

    public function getTipoEscala() {
        $sql = "SELECT * from estructuraorg.Tipoescala;";
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        return $cc->fetchAll($sql);
    }

    public function getGrupoEscala() {
        $sql = "SELECT * from estructuraorg.grupoescala;";
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        return $cc->fetchAll($sql);
    }

    public function getSalario($argIdgrupoescala) {
        $sql = "SELECT s.* from estructuraorg.salario s WHERE s.idgrupoescala = $argIdgrupoescala;";
        $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
        return $cc->fetchAll($sql);
    }

    public function getSalarioByEscala($post) {
        $tipoescala = $post->idtipoescala;
        $grupoescala = $post->idgrupoescala;
        $query = Doctrine_Query::create();
        $result = $query->select('s.*, es.*')
                ->from('Escalasalarial es')
                ->innerJoin('es.Salario s')
                ->where("es.idtipoescala = $tipoescala AND idgrupoescala = $grupoescala")
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();
        foreach ($result as &$v) {
            $v['idsalario'] = $v['Salario']['idsalario'];
            $v['salario'] = $v['Salario']['salario'];
            unset($v['Salario'], $v['idescalasalarial'], $v['idtipoescala'], $v['idgrupoescala']);
        }
        return array('data' => $result);
    }

}
