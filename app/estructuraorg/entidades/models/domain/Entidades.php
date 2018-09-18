<?php

class Entidades extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('estructuraorg.entidades');
        $this->hasColumn('identidad', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'estructuraorg.entidades_identidad'));
        $this->hasColumn('foto', 'text', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('abreviatura', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('descripcion', 'character varying', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('reeup', 'character varying', 11, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nit', 'character varying', 11, array('notnull' => false, 'primary' => false));
        $this->hasColumn('telefonos', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('correos', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('web', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('direccion', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('iddpa', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idpadre', 'numeric', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('padre', 'boolean', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('dpaext', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('geoid', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('orden', 'numeric', null, array('notnull' => false, 'primary' => false));
    }

    public function setUp() {
        parent::setUp();
    }

    public function cargarEntidades($post) {
        try {
            $idpadre = $post->node;
            $filter = (isset($post->criterio) || strlen($post->criterio)) ? $post->criterio : '';
            $query = Doctrine_Query::create();
            if (strlen($filter) > 0) {
                $query->select('e.*, e.identidad as id, e.nombre as text, true as leaf, e.descripcion as descripcion, foto as base64img')
                        ->from('Entidades e')
                        ->where("e.nombre ilike '%" . $filter . "%' OR e.descripcion ilike '%" . $filter . "%'")
                        ->orderby('orden, nombre')
                        ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            } else {
                $query->select('e.*, e.identidad as id, e.nombre as text, e.padre as leaf, e.descripcion as descripcion, foto as base64img')
                        ->from('Entidades e')
                        ->where('e.idpadre = ?', $idpadre)
                        ->orderby('orden, nombre')
                        ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            }
            return $query->execute();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function buscarEntidadesNombre($nombre, $id = 0) {
        try {
            $wherenombre = ($id === 0) ? "e.nombre='$nombre'" : "e.nombre='$nombre' AND e.identidad <> '$id'";
            $query = Doctrine_Query::create();
            $result = $query->select('*')
                    ->from('Entidades e')
                    ->where($wherenombre)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            return count($result);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    static public function buscarEntidadesIdpadre($idpadre) {
        try {
            $whereid = "e.idpadre='$idpadre'";
            $query = Doctrine_Query::create();
            $result = $query->select('*')
                    ->from('Entidades e')
                    ->where($whereid)
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            return count($result);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public static function getProvincias() {
        try {
            $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
            $sql = "SELECT t.* FROM maestros.nom_territorio t ORDER bY t.nombre;";
            $result = $cc->fetchAll($sql);
            return array('data' => $result);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getAllEntity() {
        try {
            $query = Doctrine_Query::create();
            return $query->select('*')
                            ->from('Entidades e')
                            ->orderBy('e.orden, e.idpadre, e.nombre')
                            ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                            ->execute();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getDataEntidades($post) {
        $idpadre = $post->node;
        $filter = (isset($post->criterio)) ? $post->criterio : '';
        $query = Doctrine_Query::create();
        if (strlen($filter) > 0) {
            $query->select('e.*, e.identidad as id, e.nombre as text, true as leaf, e.descripcion as descripcion, foto as base64img')
                    ->from('Entidades e')
                    ->where("e.nombre ilike '%" . $filter . "%' OR e.descripcion ilike '%" . $filter . "%'")
                    ->orderby('orden, nombre')
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY);
        } else {
            $query->select('e.*, e.identidad as id, e.nombre as text, e.padre as leaf, e.descripcion as descripcion, foto as base64img')
                    ->from('Entidades e')
                    ->where('e.idpadre = ?', $idpadre)
                    ->orderby('orden, nombre')
                    ->setHydrationMode(Doctrine::HYDRATE_ARRAY);
        }
        $result = $query->execute();
//        foreach ($result as &$v) {
//            $v['iconCls'] = ($v['leaf'] == false) ? 'entity-home' : 'entity-leaf';
//        }
        return $result;
    }

    public function loadDataEntidadesSubordinadasService($argIdUser) {
        try {
            $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
            return $cc->fetchAll("SELECT e.identidad, e.abreviatura, CONCAT(e.abreviatura, ' ', e.nombre) as nombre, CONCAT(ep.abreviatura, ' ', ep.nombre) as padre
                        FROM estructuraorg.entidades e
                        INNER JOIN estructuraorg.entidades ep ON (e.idpadre = ep.identidad)
                        INNER JOIN seguridad.usuario_rol_ent ue ON (e.identidad = ue.identidad)
                        WHERE ue.idusuario = $argIdUser AND e.padre = true
                        ORDER BY e.orden, e.nombre");
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
