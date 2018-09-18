<?php

class Grupoescala extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('estructuraorg.grupoescala');
        $this->hasColumn('idgrupoescala', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'estructuraorg.grupoescala_idgrupoescala'));
        $this->hasColumn('nombre', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('abreviatura', 'character varying', 50, array('notnull' => false, 'primary' => false));
    }

    public function getGrupoescala($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Grupoescala t')
                    ->offset($post->start)
                    ->limit($post->limit)
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY);

            $queryCount->from('Grupoescala t')
                    ->setHydrationMode(Doctrine::HYDRATE_RECORD);

            if (isset($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("t.nombre ilike '%" . $criterio . "%' OR t.abreviatura ilike '%" . $criterio . "%'");
                $queryCount->addWhere("t.nombre ilike '%" . $criterio . "%' OR t.abreviatura ilike '%" . $criterio . "%'");
            }

            $query->addOrderBy('t.idgrupoescala ASC');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

    public function buscarGrupoescala($nombre, $idgrupoescala = 0) {
        $query = Doctrine_Query::create();
        $result = $query->select('*')
                ->from('Grupoescala t')
                ->where('t.nombre = ?', array($nombre))
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();

        if (count($result) > 0) {
            if ($idgrupoescala != 0)
                return ($result[0]['idgrupoescala'] == $idgrupoescala) ? 0 : 1; // 0-> se puede mod, 1-> no mod
            else
                return 1;
        }
        else
            return 0; // 1-> encontro, 0->no encontro        
    }

    public function isUsed($idGrupoescala) {
        try {
            $sql = "SELECT * from estructuraorg.escalasalarial es WHERE es.idgrupoescala = $idGrupoescala;";
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

    public function getAllGrupoEscala() {
        try {
            $query = Doctrine_Query::create();
            return array('data' => $query->from('Grupoescala g')->setHydrationMode(Doctrine::HYDRATE_ARRAY)->addOrderBy('g.idgrupoescala ASC')->execute());
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

}
