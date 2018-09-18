<?php

class Color extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('taller.nom_color');
        $this->hasColumn('idcolor', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'taller.nom_color_idcolor'));
        $this->hasColumn('nombre', 'character varying', 100, array('notnull' => false, 'primary' => false));
    }

    public function getColors($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Color c')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Color c')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("c.nombre ilike '%" . $criterio . "%'");
                $queryCount->addWhere("c.nombre ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('c.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function buscarColorByNombre($nomb) {
        try {
            $query = Doctrine_Query::create();
            $result = $query->select('c.*')
                    ->from('Color c')
                    ->where('c.nombre=?', $nomb)
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();
            return (count($result) > 0) ? 1 : 0; //1-encontro 0-no encont
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    //==============================================================================
    //usado por expediente
    public function getColorService() {
        $query = Doctrine_Query::create();
        $result = $query->select('*')
                ->from('Color')
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();

        return $result;
    }

    //usado por expediente,tarjetaExp
    function searchColorService($idcolor) {
        $query = Doctrine_Query::create();
        $result = $query->select('*')
                ->from('Color c')
                ->where('c.idcolor=?', $idcolor)
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();
        return $result[0]['nombre'];
    }

}
