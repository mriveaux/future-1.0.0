<?php

class Areaentidad extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('estructuraorg.areaentidad');
        $this->hasColumn('idareaentidad', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'estructuraorg.areaentidad_idareaentidad'));
        $this->hasColumn('codigo', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('abreviatura', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('padre', 'boolean', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idpadre', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('identidad', 'numeric', null, array('notnull' => false, 'primary' => false));
    }

    public function setUp() {
        parent::setUp();
    }

    //carga el arbol de areaentidad
    public function cargarAreaEntidad($post) {
        if ($post->identidad && $post->node == 0) {
            $identidad = $post->identidad;
            $WHERE = "e.identidad = $identidad AND e.idpadre = 0";
        } else if ($post->identidad && $post->node !== 0) {
            $idpadre = $post->node;
            $WHERE = "e.idpadre = $idpadre";
        }

        $filter = (isset($post->criterio) || strlen($post->criterio)) ? $post->criterio : '';
        $query = Doctrine_Query::create();
        if (strlen($filter) > 0) {
            $query->select("e.*, e.idareaentidad as id, CONCAT(e.codigo, ' ',e.nombre) as text, true as leaf")
                    ->from('Areaentidad e')
                    ->where("e.nombre ilike '%" . $filter . "%' OR e.abreviatura ilike '%" . $filter . "%'")
                    ->orderby('nombre')
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY);
        } else {
            $query->select("e.*, e.idareaentidad as id, CONCAT(e.codigo, ' ',e.nombre) as text, e.padre as leaf")
                    ->from('Areaentidad e')
                    ->where($WHERE)
                    ->orderby('nombre')
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY);
        }
        return $query->execute();
    }

    //busca una entidad dado su nombre
    public function buscarAreaEntidadNombre($nombre, $identidad, $id = 0) {
        $wherenombre = ($id === 0) ? "e.nombre='$nombre' AND e.identidad='$identidad'" : "e.nombre='$nombre' AND e.identidad='$identidad' AND e.idareaentidad <> '$id'";

        $query = Doctrine_Query::create();
        $result = $query->select('*')
                ->from('Areaentidad e')
                ->where($wherenombre)
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();

        return count($result);
    }

    //busca un area dado su id
    public function buscarAreaentidadIdpadre($idpadre) {
        if ($idpadre != 0) {
            $whereid = "e.idpadre='$idpadre'";
            $query = Doctrine_Query::create();
            $result = $query->select('*')
                    ->from('Areaentidad e')
                    ->where($whereid)
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                    ->execute();
            return count($result);
        }
        else
            return 0;
    }

    public function getDataAreaEntidadIdpadre($idpadre, $argIdEntidad = 0) {
        $WHERE = ($argIdEntidad == 0) ? "e.idpadre=$idpadre" : "e.idpadre=$idpadre AND e.identidad=$argIdEntidad";
        $query = Doctrine_Query::create();
        return $query->select('*')
                        ->from('Areaentidad e')
                        ->where($WHERE)
                        ->orderBy("e.nombre")
                        ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                        ->execute();
    }

}
