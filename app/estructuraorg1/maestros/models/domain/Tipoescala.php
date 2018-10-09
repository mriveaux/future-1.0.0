<?php

class Tipoescala extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('estructuraorg.tipoescala');
        $this->hasColumn('idtipoescala', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'estructuraorg.tipoescala_idtipoescala'));
        $this->hasColumn('nombre', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('abreviatura', 'character varying', 50, array('notnull' => false, 'primary' => false));
    }

    public function getTipoescala($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Tipoescala t')
                    ->offset($post->start)
                    ->limit($post->limit)
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY);

            $queryCount->from('Tipoescala t')
                    ->setHydrationMode(Doctrine::HYDRATE_RECORD);

            if (isset($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("t.nombre ilike '%" . $criterio . "%' OR t.abreviatura ilike '%" . $criterio . "%'");
                $queryCount->addWhere("t.nombre ilike '%" . $criterio . "%' OR t.abreviatura ilike '%" . $criterio . "%'");
            }

            $query->addOrderBy('t.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

    public function buscarTipoescala($nombre, $idtipoescala = 0) {
        $query = Doctrine_Query::create();
        $result = $query->select('*')
                ->from('Tipoescala t')
                ->where('t.nombre = ?', array($nombre))
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();

        if (count($result) > 0) {
            if ($idtipoescala != 0)
                return ($result[0]['idtipoescala'] == $idtipoescala) ? 0 : 1; // 0-> se puede mod, 1-> no mod
            else
                return 1;
        }
        else
            return 0; // 1-> encontro, 0->no encontro        
    }

    public function isUsed($idTipoescala) {
        try {
            $sql = "SELECT * from estructuraorg.escalasalarial es WHERE es.idtipoescala = $idTipoescala;";
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

    public function getAllTipoEscala() {
        try {
            $query = Doctrine_Query::create();
            return array('data' => $query->from('Tipoescala t')->setHydrationMode(Doctrine::HYDRATE_ARRAY)->addOrderBy('t.nombre ASC')->execute());
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

}
