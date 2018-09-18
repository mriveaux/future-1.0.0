<?php

class Organismo extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('maestros.nom_organismo');
        $this->hasColumn('idorganismo', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'maestros.nom_organismo_idorganismo'));
        $this->hasColumn('nombre', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('abreviatura', 'character varying', null, array('notnull' => false, 'primary' => false));
    }

    public function setUp() {
        parent::setUp();
    }

    public function cargarOrganismo($post) {
        $start = $post['start'];
        $limit = $post['limit'];
        $cadena = $post['cadena'];

        $query = Doctrine_Query::create();
        $query->from('Organismo o')
                ->orderby('nombre')
                ->offset($start)
                ->limit($limit)
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY);

        $queryCount = Doctrine_Query::create();
        $queryCount->from('Organismo o')
                ->setHydrationMode(Doctrine::HYDRATE_RECORD)
                ->execute();

        if (isset($cadena) && strlen($cadena) > 0) {
            $filtroNomb = "o.nombre ILIKE '%$cadena%' OR o.abreviatura ILIKE '%$cadena%'";
            $query->addWhere($filtroNomb);
            $queryCount->addWhere($filtroNomb);
        }


        $result = $query->execute();
        $count = $queryCount->execute();


        return array('campos' => $result, 'totalrecords' => $count->count());
    }

    public function buscarOrganismo($nombre, $idorganismo = 0) {
        $query = Doctrine_Query::create();
        $result = $query->select('*')
                ->from('Organismo o')
                ->where('o.nombre = ?', array($nombre))
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();
        if (count($result) > 0) {
            if ($idorganismo != 0)
                return ($result[0]['idorganismo'] == $idorganismo) ? 0 : 1; // 0-> se puede mod, 1-> no mod
            else
                return 1;
        }
        else
            return 0; // 1-> encontro, 0->no encontro        
    }

    //=================================================================
    static public function dameOrganismo() {
        try {
            $query = Doctrine_Query::create();
            $result = $query->select('*')
                    ->from('Organismo o')
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();
            return $result;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
