<?php

class Unidadmedida extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('maestros.nom_unidadmedida');
        $this->hasColumn('idunidadmedida', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'maestros.nom_unidadmedida_idunidadmedida'));
        $this->hasColumn('abreviatura', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', 30, array('notnull' => false, 'primary' => false));
    }

    public function loadDataUnidadmedida($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Unidadmedida u')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Unidadmedida u')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("u.nombre ilike '%" . $criterio . "%' OR u.abreviatura ilike '%" . $criterio . "%'");
                $queryCount->addWhere("u.nombre ilike '%" . $criterio . "%' OR u.abreviatura ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('u.nombre');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function buscarUnidadmedida($nombre, $idunidadmedida = 0) {
        $query = Doctrine_Query::create();
        $result = $query
                ->from('Unidadmedida u')
                ->where('u.nombre = ?', $nombre)
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();
        if (count($result) > 0) {
            if ($idunidadmedida != 0) {// 0-> se puede mod, 1-> no mod
                return ($result[0]['idunidadmedida'] == $idunidadmedida) ? 0 : 1;
            } else {
                return 1;
            }
        } else {
            return 0;
        } // 1-> encontro, 0->no encontro        
    }

    //busca si el organo esta en uso
    public function unidadMedidaEnUso($idunidadmedida) {
        $query = Doctrine_Query::create();
        $result = $query
                ->from('Producto p')
                ->where('p.idunidadmedida=?', $idunidadmedida)
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();
        return (count($result) > 0) ? 1 : 0;
    }

    //=================================================================
    static public function dameUnidadmedida() {
        try {
            $query = Doctrine_Query::create();
            $result = $query->select('*')
                    ->from('Unidadmedida u')
                    ->orderBy('u.nombre')
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();
            return $result;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

}
