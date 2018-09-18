<?php

class Grupoexplotacion extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('taller.nom_grupoexplotacion');
        $this->hasColumn('idgrupoexplotacion', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'taller.nom_grupoexplotacion_idgrupoexplotacion'));
        $this->hasColumn('nombre', 'character varying', 100, array('notnull' => true, 'primary' => false));
        $this->hasColumn('km', 'numeric', null, array('notnull' => true, 'primary' => false));
    }

    public function getGrupoexplotacion($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Grupoexplotacion g')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Grupoexplotacion g')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("g.nombre ilike '%" . $criterio . "%'");
                $queryCount->addWhere("g.nombre ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('g.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getGrupoByNombre($nombre, $idgrupo = null) {
        try {
            $WHERE = ($idgrupo) ? "g.nombre = '$nombre' AND g.idgrupoexplotacion <> '$idgrupo'" : "g.nombre = '$nombre'";
            $query = Doctrine_Query::create();
            $result = $query->select('g.*')
                    ->from('Grupoexplotacion g')
                    ->where($WHERE)
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();
            return (count($result) > 0) ? 1 : 0; //1-encontro 0-no encont
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getGrupoexplotacionService() {
        try {
            $query = Doctrine_Query::create();
            $result = $query->select('*')
                    ->from('Grupoexplotacion g')
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();

            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
