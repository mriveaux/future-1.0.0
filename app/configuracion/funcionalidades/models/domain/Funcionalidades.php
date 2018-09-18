<?php

class Funcionalidades extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('configuracion.funcionalidades');
        $this->hasColumn('idfuncionalidades', 'numeric', 19, array('notnull' => true, 'primary' => true, 'sequence' => 'configuracion.funcionalidades_idfuncionalidades'));
        $this->hasColumn('descripcion', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('abreviatura', 'character varying', 50, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idmodulo', 'numeric', 19, array('notnull' => true, 'primary' => false));
        $this->hasColumn('idpadre', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('nombre', 'character varying', 100, array('notnull' => false, 'primary' => false));
        $this->hasColumn('padre', 'boolean', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('src', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('indice', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('label', 'character varying', 100, array('notnull' => false, 'primary' => false));
    }

    public function setUp() {
        parent::setUp();
        $this->hasMany('RolesFunct', array('local' => 'idfuncionalidades', 'foreign' => 'idfuncionalidades'));
        $this->hasOne('Modulos', array('local' => 'idmodulo', 'foreign' => 'idmodulo'));
    }

    static public function buscarFuncionalidades($post) {
        try {
            $idmodulo = $post->idmodulo;
            $nodo = isset($post->nodo) ? $post->nodo : $post->node;
            $condicion = "f.idpadre='$nodo' AND f.idmodulo='$idmodulo'";

            $query = Doctrine_Query::create();
            $result = $query->select('f.idfuncionalidades as id, f.nombre as text, f.padre as leaf,f.descripcion, f.src, f.indice, f.abreviatura, f.label')
                    ->from('Funcionalidades f')
                    ->where($condicion)
                    ->orderby('indice, nombre')
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            $data_result = array();
            foreach ($result as $res) {
                $data = new stdClass();
                $data->id = $res['id'];
                $data->text = $res['text'];
                $data->leaf = $res['leaf'];
                $data->descripcion = $res['descripcion'];
                $data->abreviatura = $res['abreviatura'];
                $data->src = $res['src'];
                $data->indice = $res['indice'];
                $data->label = $res['label'];
                $data_result[] = $data;
            }
            return $data_result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    //busca una funcionalidad por nombre
    static public function buscarFuncionalidadNombre($nombre, $idpadre, $idmodulo) {
        $condicion = "f.idpadre='$idpadre' AND f.nombre='$nombre' AND f.idmodulo='$idmodulo'";
        $query = Doctrine_Query::create();
        $result = $query->select('*')
                ->from('Funcionalidades f')
                ->where($condicion)
                ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                ->execute();
        return (count($result) > 0) ? 1 : 0;
    }

    //busca una funcionalidad por idpadre
    static public function buscarFuncionalidadIdpadre($idpadre) {
        $wherepadre = "f.idpadre='$idpadre'";

        $query = Doctrine_Query::create();
        $result = $query->select('*')
                ->from('Funcionalidades f')
                ->where($wherepadre)
                ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                ->execute();

        return count($result);
    }

    //carga las funcionalidades con los check (roles)
    static public function cargarFuncionalidadesCheck($idmodulo, $nodo, $idrol) {//RolesFunct
        $whereFunct = "f.idpadre='$nodo' AND f.idmodulo='$idmodulo'";

        $query = Doctrine_Query::create();
        $result = $query->select('f.idfuncionalidades as id, f.nombre as text, f.padre as leaf, f.indice, f.label')
                ->from('Funcionalidades f')
                ->where($whereFunct)
                ->orderby('indice,nombre')
                ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                ->execute();

        $data_result = array();
        foreach ($result as $value) {
            $data = new stdClass();
            //se manda a buscar si esta asignado al rol
            $query1 = Doctrine_Query::create();
            $rolesFunct = $query1->select('*')
                    ->from('RolesFunct rf')
                    ->where('rf.idroles=' . $idrol . ' AND rf.idfuncionalidades=' . $value['id'])
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();

            //si esta asignado
            if (count($rolesFunct) > 0)
                $data->checked = true;
            //si no esta asignado
            else
                $data->checked = false;
            $data->id = $value['id'];
            $data->text = $value['text'];
            $data->leaf = $value['leaf'];
            $data_result[] = $data;
        }
        return $data_result;
    }

    /* ======================================================================= */

    //busca una funcionalidad por url
    public function getFunctionalityByUrl($url) {
        $where = "f.src='$url'";
        $query = Doctrine_Query::create();
        $result = $query->select('*')
                ->from('Funcionalidades f')
                ->where($where)
                ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                ->execute();

        return $result;
    }

    static public function getFuncionalidadesRol($idmodulo, $nodo) {
        $idroles = $_SESSION['arridroles'];
        $condicion = "f.idpadre='$nodo' AND f.idmodulo='$idmodulo'";

        $query = Doctrine_Query::create();
        $result = $query->select('f.idfuncionalidades as id, f.nombre as text, f.padre as leaf,f.descripcion, f.src, f.label')
                ->from('Funcionalidades f')
                ->innerJoin('f.RolesFunct rf')
                ->where($condicion)
                ->whereIn('rf.idroles', $idroles)
                ->orderby('indice, nombre')
                ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                ->execute();
        $data_result = array();
        foreach ($result as $res) {
            $data = new stdClass();
            $data->id = $res['id'];
            $data->text = $res['text'];
            $data->leaf = $res['leaf'];
            $data->descripcion = $res['descripcion'];
            $data->src = $res['src'];
            $data->label = $res['label'];
            $data_result[] = $data;
        }
        return $data_result;
    }

    /**
     * Dado el idrol carga los modulos asociados.
     * @param type $arrIdRoles
     * @return array Datos dado el idroles.
     */
    public static function getModulos($arrIdRoles) {
        $query = Doctrine_Query::create();
        $result = $query->select('m.*')
                ->from('Modulos m')
                ->innerJoin('m.Funcionalidades f')
                ->innerJoin('f.RolesFunct rf')
                ->whereIn('rf.idroles', $arrIdRoles)
                ->orderBy('m.indice, m.nombre')
                ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                ->execute();
        return $result;
    }

    public function getFuncionalidadesRolService($arrIdroles) {
        $query = Doctrine_Query::create();
        $result = $query->select('f.*, m.nombre as modulo, m.indice as modindice, rf.idrolesfunct as idrolesfunct')
                ->from('Funcionalidades f')
                ->innerJoin('f.Modulos m')
                ->innerJoin('f.RolesFunct rf')
                ->whereIn("rf.idroles", $arrIdroles)
                ->orderby('m.indice, f.indice, f.nombre')
                ->setHydrationMode(Doctrine::HYDRATE_ARRAY)
                ->execute();
        return $result;
    }

    public function getFuncionalidadesService($post) {
        try {
            $idmodulo = $post->idmodulo;
            $nodo = isset($post->nodo) ? $post->nodo : $post->node;
            $condicion = "f.idpadre='$nodo' AND f.idmodulo='$idmodulo'";

            $query = Doctrine_Query::create();
            $result = $query->select('f.idfuncionalidades as id, f.nombre as text, f.padre as leaf,f.descripcion, f.src, f.indice, f.abreviatura, f.label, f.idmodulo')
                    ->from('Funcionalidades f')
                    ->where($condicion)
                    ->orderby('indice, nombre')
                    ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                    ->execute();
            $data_result = array();
            foreach ($result as $res) {
                $data = new stdClass();
                $data->id = $res['id'];
                $data->idmodulo = $res['idmodulo'];
                $data->text = $res['text'];
                $data->leaf = $res['leaf'];
                $data->descripcion = $res['descripcion'];
                $data->abreviatura = $res['abreviatura'];
                $data->src = $res['src'];
                $data->indice = $res['indice'];
                $data->label = $res['label'];
                $data_result[] = $data;
            }
            return $data_result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
