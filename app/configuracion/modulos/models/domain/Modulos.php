<?php

class Modulos extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('configuracion.modulos');
        $this->hasColumn('idmodulo', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'configuracion.modulos_idmodulo'));
        $this->hasColumn('nombre', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('abreviatura', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('descripcion', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('icono', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('indice', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('label', 'character varying', 100, array('notnull' => false, 'primary' => false));
    }

    public function setUp() {
        parent::setUp();
        $this->hasMany('Funcionalidades', array('local' => 'idmodulo', 'foreign' => 'idmodulo'));
    }

    static public function cargarModulos($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Modulos m')
                    ->offset($post->start)
                    ->limit($post->limit)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Modulos m')
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);

            if (isset($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere(" m.nombre ilike '%" . $criterio . "%' OR  m.descripcion ilike '%" . $criterio . "%'");
                $queryCount->addWhere(" m.nombre ilike '%" . $criterio . "%' OR  m.descripcion ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('m.indice, m.nombre');

            $result = $query->execute();
            $count = $queryCount->execute();

            return array('campos' => $result, 'totalrecords' => count($count));
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getAllModulesService() {
        try {
            $query = Doctrine_Query::create();
            $query->from('Modulos m')
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);

            if (isset($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere(" m.nombre ilike '%" . $criterio . "%' OR  m.descripcion ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('m.indice, m.nombre');
            $result = $query->execute();

            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
